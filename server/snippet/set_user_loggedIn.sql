DELIMITER $$
CREATE PROCEDURE `set_user_loggedIn`(
    IN userId_val INT
)
BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while updating logIn status of user in database.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
   -- update user status to true
    UPDATE users SET isLoggedIn = NOT isLoggedIn WHERE user_id =userId_val;
    
    IF ROW_COUNT()<1 THEN
		SET custom_message='Error in updation of user log in status in database';
	END IF;
    
END$$
DELIMITER ;