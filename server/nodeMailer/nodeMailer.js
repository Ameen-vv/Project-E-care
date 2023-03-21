import nodeMailer from 'nodemailer'


const sendMail = (email,otp)=>{
    let response = {
        otpSent:true
    }
    return new Promise((resolve,reject)=>{
        let transporter = nodeMailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: 'ecare4000@gmail.com',
                pass: process.env.MAILPASS,
            }
           
        })
        var mailOptions = {
            to: email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>" // html body
        }
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                response.otpSent = false
            }
            console.log("msg sent");
        })
        resolve(response)
    })


}

export default sendMail