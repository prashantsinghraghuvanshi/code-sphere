const nodemailer=require('nodemailer');

const sendmailController=async(req, res)=>{
    try {
        console.log(req);
        
        const otp=2334;
        const testAccount=await nodemailer.createTestAccount();

        // connection with SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'max.hermann34@ethereal.email',
                pass: 'EbWywaAg5sAxp1gZVU'
            }
        });

        // sending email
        const info = await transporter.sendMail({
            from: '"Code-Sphere" <prashant@gmail.com>', 
            to: 'singhprashant0314@gmail.com', 
            subject: 'mail to sign in to your code-sphere account',
            text: `Hello, you recieved this mail as you've tried to sign in on code sphere, your otp is ${otp}`,
            html: "<b>Hello from code-sphere</b>", // html body
        });
    
        console.log('Email sent to user.');

        res.status(200).json(info);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports={
    sendmailController
};