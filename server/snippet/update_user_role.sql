DROP PROCEDURE IF EXISTS update_user_role;

DELIMITER $$
CREATE PROCEDURE `update_user_role`(
    IN roleId_val INT,
    IN adminId_val INT,
    IN userId_val INT
)

BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while updating user role.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
   -- update user role
    update user_roles set role_id=roleId_val, updated_by=adminId_val where user_id=userId_val;
    
    IF ROW_COUNT()<1 THEN
		SET custom_message='Error in updation of user role';
	END IF;
    
END$$
DELIMITER ;