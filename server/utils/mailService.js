const nodemailer=require('nodemailer');

const sendMail=async()=> {
    let response={
        success : false
    }

    try {
        const otp=7539;

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
            text: `you've tried to sign in on code sphere, your otp is ${otp}`,
            html: "<b>Hello from code-sphere</b>", // html body
        });

        response.success=true;
        response.message='email sent to user'
    } catch (error) {
        response.message=error.message;
    }

    return response;
}

module.exports={
    sendMail
}