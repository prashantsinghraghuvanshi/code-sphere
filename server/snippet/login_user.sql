DELIMITER $$
CREATE PROCEDURE `login_user`(
    IN userId_val INT
)

BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE role_id_val INT;
DECLARE EXIT HANDLER FOR SQLEXCEPTION

    BEGIN
        IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while updating logIn status of user in database.';
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;
    END;

   -- update user status to true
    UPDATE users SET isLoggedIn = TRUE WHERE user_id = userId_val;

    IF ROW_COUNT() < 1 THEN
        SET custom_message = 'Error in updation of user log in status in database';
    END IF;

	-- returning relevant data back to user
    SELECT u.user_id, u.username, u.first_name, u.icon, r.rolename
    FROM users u
    JOIN user_roles ur ON u.user_id = ur.user_id
    JOIN roles r ON ur.role_id = r.role_id
    WHERE u.user_id = userId_val;

END$$
DELIMITER ;