const db=require('../config/db');
const bcrypt=require('bcrypt');

const signInUser=async(body)=>{
    let response={
        isSuccessful: true,
        errorMessage: null,
    }

    try {
        const [result]=await db.query(`SELECT user_id, password FROM users WHERE username=?`,[body.username]);

        if(result.length===0){
            response.errorMessage='Invalid username or password';
            return response;
        }

        const isMatch = await bcrypt.compare(body.password, result[0].password);

        if(!isMatch){
            response.errorMessage='Invalid username or password';
            return response;
        }
        response.isSuccessful=true;
    } catch (error) {
        response.errorMessage=errorMessage;
    }

    return response;
}

module.exports={
    signInUser
}