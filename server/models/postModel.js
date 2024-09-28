const db=require('../config/db');

const postQues=async(title, content, user_id)=>{
    let response={
        success: false
    }

    try {
        const [result]=await db.query('CALL post_question(?,?,?)',[title, content, user_id]);

        if(result.length>0){
            response.success=true;
            response.message='query posted successfully';
            response.data=result[0][0];
        }

    } catch (error) {
        if (error.code === 'ER_SIGNAL_EXCEPTION') {
            response.errorMessage = error.sqlMessage || 'An error occurred in posting question process.';
        } else {
            response.errorMessage = error.message || 'Unexpected error during posting question.';
        }
    } finally {
        return response;
    }
}

const postSol=async(query_id, content, user_id)=>{
    let response={
        success: false
    }

    try {
        const [result]=await db.query('CALL post_solution(?,?,?)',[query_id, user_id, content])

        if(result){
            response.success=true;
            response.message='solution posted successfully';
            response.data=result[0];
        } else {
            response.message='solution couldnt be posted';
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