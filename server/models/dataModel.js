const db=require('../config/db');

const userByIdModel=async(userId)=>{
    let response={
        success: false
    }

    try {
        const [result]=await db.query('CALL get_user_data_by_id(?)',[userId]);

        if(result.length===0){
            response.errorMessage='unable to fetch user data';
            return response;
        }

        response.success=true;
        response.message=result[0][0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.errorMessage=error.sqlMessage || 'An error occured at query handling';
        } else {
            response.errorMessage=error.message || 'unexpected error occured at server side';
        }
    }

    return response;
}

module.exports={
    userByIdModel
}