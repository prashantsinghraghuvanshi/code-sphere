DROP PROCEDURE IF EXISTS post_otp;

DELIMITER $$
CREATE PROCEDURE `post_otp`(
    IN userId_val INT,
    IN otp_val VARCHAR(4)
)
BEGIN
DECLARE custom_message VARCHAR(255);
DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while posting otp.';				
		END IF;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
	END;
    
    IF NOT EXISTS (SELECT 1 FROM otpRecord WHERE user_id=userId_val) THEN
		  INSERT INTO otpRecord(user_id, otp) VALUES(userId_val, otp_val);
    END IF;
    
   -- Insert the otp
    UPDATE otpRecord SET otp=otp_val WHERE user_id=userId_val;
    
END $$
DELIMITER ;