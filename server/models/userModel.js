const db = require('../config/db');
const bcrypt = require('bcrypt');

const signUpUser = async (body) => {
    let response = {
        success: false,
        message: null
    };

    try {
        const hashPassword = await bcrypt.hash(body.password, 8);
        const iconTemplate = 'https://api.multiavatar.com/' + body.username + '.svg';

        const {rows} = await db.query(
            `SELECT * FROM register_user($1, $2, $3, $4, $5, $6)`, 
            [body.username, body.email, body.firstName, body.lastName, iconTemplate, hashPassword]
        );

        if (rows.length > 0) {
            response.success = true;
            response.message = "User added successfully";
        } else {
            response.message = rows[0].error || 'Duplicate Data';
        }

    } catch (error) {
        response.message = error.message || 'Unexpected error during sign-up.';
    } finally {
        return response;
    }
};



const findById = async (user_id) => {
    let response = {
        success: false
    };

    try {
        // Use `SELECT` for stored procedures in PostgreSQL
        const { rows: result } = await db.query(`SELECT find_role_by_userId($1)`, [user_id]);
        const rolename = result[0]?.role_name;
        if (!rolename) {
            response.message = 'Error in stored procedure for findById';
            return response;
        }
        response.success = true;
        response.rolename = rolename;
    } catch (error) {
        response.message = error.message || 'Unexpected error during finding user data.';
    } finally {
        return response;
    }  
};


module.exports={
    signUpUser,
    findById
}