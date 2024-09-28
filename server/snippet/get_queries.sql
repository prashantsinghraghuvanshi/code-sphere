DELIMITER $$
CREATE PROCEDURE `get_all_queries`()
BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while fetching queries from database.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
    -- Get the queries data and username
    SELECT questions.*, users.username, users.icon
    FROM questions
    LEFT JOIN users
    ON questions.created_by=users.user_id;
    
END$$
DELIMITER ;