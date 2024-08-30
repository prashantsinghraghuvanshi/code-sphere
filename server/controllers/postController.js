const postModel=require('../models/postModel');

const postQuestion=async(req, res)=>{
    try {
        const role=req.roleUser;
        if(role!=='mentor' && role!=='user' && role!=='admin'){
            return res.status(401).json({error:'unauthorized user'})
        }

        const {title, content, user_id}=req.body;
        if(!title || !content || !user_id){
            return res.status(400).json({error:"missing data field in request"})
        }

        const data=await postModel.postQues(title, content, user_id);
        if(!data.isSuccessful){
            return res.status(500).json({error:"failed to post question"});
        }

        return res.status(201).json({message: "question posted"});
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const postSolution=async(req, res)=>{
    try {
        const role=req.roleUser;
        if(role!='mentor'){
            return res.status(401).json({error:'unauthorized user'})
        }

        const {query_id, content, user_id}=req.body;
        if(!query_id || !content || !user_id){
            return res.status(400).json({error: 'missing data'})
        }

        const data=await postModel.postSol(query_id, content, user_id);
        if(!data.isSuccessful){
            return res.status(500).json({error: 'failed to post solution'});
        }
        return res.status(201).json({message: "solution posted"});
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

module.exports={
    postQuestion,
    postSolution
}