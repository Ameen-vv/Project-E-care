const otpGenerator = ()=>{
    let otp = ''
    return new Promise((resolve,reject)=>{
        for (let i = 0; i < 6;i++){
            otp +=  Math.floor(Math.random()*10)
          }
          console.log(otp,typeof otp);
          resolve(otp)

    })
}

export default otpGenerator