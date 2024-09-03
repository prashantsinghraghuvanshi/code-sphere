DROP PROCEDURE IF EXISTS signUp_user;

DELIMITER $$
CREATE PROCEDURE `signUp_user`(
    IN username_val VARCHAR(50),
    IN email_val VARCHAR(100),
    IN password_val VARCHAR(255)
)
BEGIN
DECLARE user_id INT;
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while registering user.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    IF EXISTS (SELECT 1 FROM users WHERE username = username_val) THEN
		SET custom_message = 'User with this provided user name already exists.';
		SIGNAL SQLSTATE '45000'; 
	END IF;
    IF EXISTS (SELECT 1 FROM users WHERE email = email_val) THEN
		SET custom_message = 'Provided email address already exists.';
		SIGNAL SQLSTATE '45000'; 
	END IF;
   -- Insert the new user
    INSERT INTO users (username, email, password) 
    VALUES (username_val, email_val, password_val);
 
    -- Return the created user data
    SET user_id = LAST_INSERT_ID();
    
    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id=user_id) THEN
		SET custom_message='Failed to insert data into users table';
    END IF;
    
    INSERT INTO user_roles(user_id) VALUES (user_id);
    
    IF NOT EXISTS (SELECT 1 FROM user_roles WHERE user_id=user_id) THEN
		SET custom_message='Failed to insert data into user_roles table';
    END IF;
    
    INSERT INTO otpRecord(user_id) VALUE (user_id);
    
    IF NOT EXISTS (SELECT 1 FROM otpRecord WHERE user_id=user_id) THEN
		SET custom_message='Failed to insert data into otpRecord table';
    END IF;
    
END$$
DELIMITER ;