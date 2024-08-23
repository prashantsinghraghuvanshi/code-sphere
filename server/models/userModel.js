const db=require('../config/db');
const bcrypt=require('bcrypt');

const signUpUser=async(body)=>{
    let response={
        isSuccessful: false,
        userAdded: null,
    };

    try {
        const hashPassword=await bcrypt.hash(body.password, 8);
        const [result] = await db.query(
            `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
            [body.username, body.email, hashPassword]
          );

        if(result.affectedRows>0){
            response.isSuccessful=true;
            response.userAdded="user added successfully";
        }
    } catch (error) {
        response.errorMessage=error.message;
    }
    return response;
}



module.exports={
    signUpUser
}