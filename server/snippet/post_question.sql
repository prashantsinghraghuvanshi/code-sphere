use code_sphere;

DROP PROCEDURE IF EXISTS post_question;

DELIMITER $$
CREATE PROCEDURE `post_question`(
    IN title_val VARCHAR(255),
    IN content_val TEXT,
    IN userId_val INT
)
BEGIN
DECLARE queryId INT;
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while posting question.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    IF EXISTS (SELECT 1 FROM questions WHERE title = title_val) THEN
		IF EXISTS (SELECT 1 FROM questions WHERE content = content_val) THEN
			SET custom_message = 'Duplicate question';
			SIGNAL SQLSTATE '45000'; 
		END IF; 
	END IF;
    
   -- Insert the question table
    INSERT INTO questions (title, content, created_by) 
    VALUES (title_val, content_val, userId_val);
    
    SET queryId=LAST_INSERT_ID();
    
    IF NOT EXISTS (SELECT 1 FROM questions WHERE query_id=queryId) THEN
		SET custom_message='Failed to insert data into queries table';
    END IF;
    
END$$
DELIMITER ;