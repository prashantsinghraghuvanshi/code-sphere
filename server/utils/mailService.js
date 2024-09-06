const nodemailer=require('nodemailer');
const fs= require('fs');
const path=require('path');

const sendMail=async()=> {
    let response={
        success : false
    }

    try {
        const otp=7539;

        const htmlTemplatePath = path.join(__dirname, 'mailTemplate.html');
        const htmlTemplate = await fs.promises.readFile(htmlTemplatePath, 'utf-8');

        const testAccount=await nodemailer.createTestAccount();

        const personalizedHtml = htmlTemplate.replace('[Recipient]', 'User');

        // connection with SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'max.hermann34@ethereal.email',
                pass: 'EbWywaAg5sAxp1gZVU'
            }
        });

        await transporter.verify();
        

        // sending email
        const info = await transporter.sendMail({
            from: '"Code-Sphere" <prashant@gmail.com>', 
            to: 'singhprashant0314@gmail.com', 
            subject: 'mail to sign in to your code-sphere account',
            text: `you've tried to sign in on code sphere, your otp is ${otp}`,
            html: htmlTemplate, // html body
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