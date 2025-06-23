import nodemailer from 'nodemailer'

interface IMailInformation{
to : string,
subject : string,
text : string
}

const sendMail = async (mailInformation: IMailInformation)=>{

    //create a transport

    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.NODEMAILER_USER,
            pass : process.env.NODEMAILER_APP_PASSWORD
        }
    })

    const mailFormatObject = {
        from : "EdTech SaaS Project",
        to : mailInformation.to,
        subject : mailInformation.subject,
        text : mailInformation.text
    }

    try{
        await transporter.sendMail(mailFormatObject)
    }catch(error){
        console.log(error);
        
    }

}

export default sendMail