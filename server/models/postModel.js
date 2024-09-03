const db=require('../config/db');

const postQues=async(title, content, user_id)=>{
    let response={
        isSuccessful: false
    }

    try {
        const [result]=await db.query('CALL post_question(?,?,?)',[title, content, user_id]);

        if(result.affectedRows>0){
            response.isSuccessful=true;
            response.message='query posted successfully';
        }

    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            response.errorMessage = error.sqlMessage || 'An error occurred in posting question process.';
        } else {
            response.errorMessage = error.message || 'Unexpected error during posting question.';
        }
    }

    return response;
}

const postSol=async(query_id, content, user_id)=>{
    let response={
        isSuccessful: false
    }

    try {
        const [result]=await db.query('CALL post_solution(?,?,?)',[query_id, user_id, content])

        if(result.affectedRows>0){
            response.isSuccessful=true;
            response.message='solution posted successfully';
        }

    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            response.errorMessage = error.sqlMessage || 'An error occurred in posting solution process.';
        } else {
            response.errorMessage = error.message || 'Unexpected error during posting solution.';
        }
    }
    return response;
}

module.exports={
    postQues,
    postSol
}