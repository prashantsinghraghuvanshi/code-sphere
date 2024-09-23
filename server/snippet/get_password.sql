DROP PROCEDURE IF EXISTS get_password;

DELIMITER $$
CREATE PROCEDURE `get_password`(
    IN userId_val INT
)

BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while posting solution.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id=userId_val) THEN
		SET custom_message='Failed to get data from user table(doesnt exist)';
    END IF;
    
    -- Get the user data
    SELECT users.password FROM users WHERE user_id=userId_val;
    
END$$
DELIMITER ;