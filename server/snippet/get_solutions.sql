DROP PROCEDURE IF EXISTS get_solutions;

DELIMITER $$

CREATE PROCEDURE `get_solutions`(
    IN questionId_val INT
)
BEGIN
    DECLARE custom_message VARCHAR(255) DEFAULT 'Error while fetching solutions from database.';

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;
    END;

    SELECT solutions.content, users.username, solutions.updated_at
    FROM solutions
    INNER JOIN users
    ON solutions.created_by = users.user_id 
    WHERE solutions.query_id = questionId_val;
    
END$$

DELIMITER ;
