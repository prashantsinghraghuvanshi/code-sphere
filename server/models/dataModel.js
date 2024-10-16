const db=require('../config/db');

const userByIdModel=async(userId)=>{
    let response={
        success: false
    }

    try {
        const [result]=await db.query('CALL get_user_data_by_id($1)',[userId]);

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

const getQueriesById=async(userId)=>{
    let response={
        success: false
    }

    try {
        const [result]=await db.query('CALL get_queries_by_userId(?)',[userId]);

        if(result.length===0){
            response.errorMessage='Unable to fetch user queries data.';
            return response;
        }

        response.success=true;
        response.message="user queries fetched successfully";
        response.data=result[0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.errorMessage=error.sqlMessage || 'An error occured at query handling';
        } else {
            response.errorMessage=error.message || 'unexpected error occured at server side';
        }
    } finally {
        return response;
    }
}

const getQueries=async()=>{
    let response={
        success: false,
        message: null
    }

    try {
        const [result]=await db.query('CALL get_all_queries()');

        if(result.length===0){
            response.message='unable to fetch queries from database';
            return response;
        }

        response.success=true;
        response.message='fetched available queries from database';
        response.queries=result[0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.message=error.sqlMessage || 'An error occured at query handling';
        } else {
            response.message=error.message || 'unexpected error occured at server side';
        }
    } finally {
        return response;
    }
}

const getStats=async(userId)=>{
    let response={
        success: false,
        message: null
    }
    try {
        const [result]=await db.query(`CALL get_queries_data(?)`,[userId]);

        if(result.length===0){
            response.message='unable to fetch data from database';
            return response;
        }

        response.success=true;
        response.message='fetched user stats from database';
        response.stats=result[0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.message=error.sqlMessage || 'An error occured at query handling';
        } else {
            response.message=error.message || 'unexpected error occured at server side';
        }
    } finally {
        return response;
    }
}

const getSolutionModel=async(query_id)=>{
    let response={
        success: false,
        message: null
    }

    try {
        const [result]=await db.query(`CALL get_solutions(?)`,[query_id]);

        if(result.length===0){
            response.message='unable to fetch solutions from database';
            return response;
        }

        response.success=true;
        response.message='successfully fetched solutions from database';
        response.data=result[0];
    } catch (error) {
        if(error.code==='ER_SIGNAL_EXCEPTION'){
            response.message=error.sqlMessage || 'An error occured at query handling';
        } else {
            response.message=error.message || 'unexpected error occured at server side';
        }
    } finally {
        return response;
    }
}

module.exports={
    userByIdModel,
    getQueries,
    getStats,
    getSolutionModel,
    getQueriesById
}