CREATE PROCEDURE `verify_otp`(
    IN userId_val INT
)
BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while finding otp in database.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
    IF NOT EXISTS (SELECT 1 FROM otpRecord WHERE user_id=userId_val) THEN
		SET custom_message='No otp record found in database for user';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;
    ELSE
		SELECT * FROM otpRecord WHERE user_id = userId_val;
	END IF;
    
END