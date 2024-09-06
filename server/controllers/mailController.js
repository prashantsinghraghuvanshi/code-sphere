const { sendMail } = require('../utils/mailService');

const sendmailController=async(req, res)=>{
    try {
        const {username, otp}=req;

        const mail = await sendMail(username, otp);

        if(!mail.success){
            res.status(500).json({
                success : mail.success,
                message : mail.message
            })
        }

        res.status(200).json({
            success : mail.success,
            message : mail.message
        });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports={
    sendmailController
};