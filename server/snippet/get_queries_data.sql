DROP PROCEDURE IF EXISTS get_queries_data;

DELIMITER $$

CREATE PROCEDURE `get_queries_data`(
    IN userId_val INT
)

BEGIN
    DECLARE custom_message VARCHAR(255);
    DECLARE queries_posted_count INT DEFAULT 0;
    DECLARE queries_solved_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        IF custom_message IS NULL OR custom_message = '' THEN
            SET custom_message = 'Error while fetching queries data from database.';                
        END IF;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = custom_message;            
    END;
    
    -- Get the count of queries posted
    SELECT COUNT(*) INTO queries_posted_count
    FROM queries
    WHERE created_by = userId_val;
    
    IF queries_posted_count < 1 THEN
        SET custom_message = 'Error in fetching queries posted data from table';
    END IF;

    -- Get the count of queries solved
    SELECT COUNT(*) INTO queries_solved_count
    FROM solutions
    WHERE created_by = userId_val;

    -- Return both counts in a single result
    SELECT queries_posted_count AS queries_posted, queries_solved_count AS queries_solved;
    
END$$

DELIMITER ;
