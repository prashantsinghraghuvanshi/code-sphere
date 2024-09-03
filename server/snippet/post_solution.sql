DROP PROCEDURE IF EXISTS post_solution;

DELIMITER $$
CREATE PROCEDURE `post_solution`(
    IN queryId_val INT,
    IN userId_val INT,
    IN content_val TEXT
)

BEGIN
DECLARE solutionId INT;
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while posting solution.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
   -- Insert the solution
    INSERT INTO solutions (query_id, created_by, content) 
    VALUES (queryId_val, userId_val, content_val);
    
    SET solutionId=LAST_INSERT_ID();
    
    IF NOT EXISTS (SELECT 1 FROM solutions WHERE solution_id=solutionId) THEN
		SET custom_message='Failed to insert data into solutions table';
    END IF;
    
END$$
DELIMITER ;