import appointmentModel from "../../model/appointmentSchema.js";
import doctorModel from "../../model/doctorSchema.js";
import userModel from "../../model/userSchema.js";

export const checkSlots = (slots,id)=>{
    return new Promise((resolve,reject)=>{
        let response = {}
        let check
        doctorModel.findOne({_id:id}).then((doctor)=>{
            let slotsArray = doctor.timings
            for(let i = 0;i<slotsArray.length;i++){
                if(slotsArray[i].day === slots.day){
                    if(slotsArray[i].startTime === slots.startTime || slotsArray[i].endTime === slots.endTime){
                        check = true
                        break
                    }else{
                        continue
                    }
                }else{
                    continue
                }
            }
            // if(check){
            //     response.status = false
            //     resolve(response)
            // }else{
            //     response.status = true
            //     resolve(response)
            // }
            resolve(check)
        })
    })
}

export const titleCase = (str) => {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(' ');
}

export const checkingSlotsAvailability = ({ newDate, time, doctorId})=>{
    return new Promise((resolve,reject)=>{
        doctorModel.findOne({_id:doctorId}).then((doctor)=>{
            let timings = doctor?.timings
            if(timings){
                let slot = timings.filter((slots)=>{
                    let timeArr = time.split('-')
                    if(slots.startTime === timeArr[0] && slots.endTime === timeArr[1]){
                        return slots
                    }

                })
               let slotCount = parseInt(slot[0].slots)
               appointmentModel.countDocuments({doctorId:doctorId,date:newDate,slot:time}).then((count)=>{
                    if(slotCount>count){
                       resolve({available:true,amount:doctor.priceOffline}) 
                    }else{
                       resolve({available:false}) 
                    }
               }) 
            }
        })  
    })
}


export const getUserCountGraph = ()=>{
    return new Promise((resolve,reject)=>{
        let userCount = []
        const year = new Date().getFullYear()
        userModel.count({ createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-02-01`) } }).then(res => {
            userCount.push(res)
            userModel.count({ createdAt: { $gte: new Date(`${year}-02-01`), $lt: new Date(`${year}-03-01`) } }).then(res => {
                userCount.push(res)
                userModel.count({ createdAt: { $gte: new Date(`${year}-03-01`), $lt: new Date(`${year}-04-01`) } }).then(res => {
                    userCount.push(res)
                    userModel.count({ createdAt: { $gte: new Date(`${year}-04-01`), $lt: new Date(`${year}-05-01`) } }).then(res => {
                        userCount.push(res)
                        userModel.count({ createdAt: { $gte: new Date(`${year}-05-01`), $lt: new Date(`${year}-06-01`) } }).then(res => {
                            userCount.push(res)
                            userModel.count({ createdAt: { $gte: new Date(`${year}-06-01`), $lt: new Date(`${year}-07-01`) } }).then(res => {
                                userCount.push(res)
                                userModel.count({ createdAt: { $gte: new Date(`${year}-07-01`), $lt: new Date(`${year}-08-01`) } }).then(res => {
                                    userCount.push(res)
                                    userModel.count({ createdAt: { $gte: new Date(`${year}-08-01`), $lt: new Date(`${year}-09-01`) } }).then(res => {
                                        userCount.push(res)
                                        userModel.count({ createdAt: { $gte: new Date(`${year}-09-01`), $lt: new Date(`${year}-10-01`) } }).then(res => {
                                            userCount.push(res)
                                            userModel.count({ createdAt: { $gte: new Date(`${year}-10-01`), $lt: new Date(`${year}-11-01`) } }).then(res => {
                                                userCount.push(res)
                                                userModel.count({ createdAt: { $gte: new Date(`${year}-11-01`), $lt: new Date(`${year}-12-01`) } }).then(res => {
                                                    userCount.push(res)
                                                    userModel.count({ createdAt: { $gte: new Date(`${year}-12-01`), $lte: new Date(`${year}-02-31`) } }).then(res => {
                                                        userCount.push(res)
                                                        resolve(userCount)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}


export const getAppointmentCountGraph = ()=>{
    return new Promise((resolve,reject)=>{
        let appointmentCount = []
        const year = new Date().getFullYear()
        appointmentModel.count({createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-02-01`) }}).then(res=>{
            appointmentCount.push(res)
            appointmentModel.count({createdAt: { $gte: new Date(`${year}-02-01`), $lt: new Date(`${year}-03-01`) }}).then(res=>{
                appointmentCount.push(res)
                appointmentModel.count({createdAt: { $gte: new Date(`${year}-03-01`), $lt: new Date(`${year}-04-01`) }}).then(res=>{
                    appointmentCount.push(res)
                    appointmentModel.count({createdAt: { $gte: new Date(`${year}-04-01`), $lt: new Date(`${year}-05-01`) }}).then(res=>{
                        appointmentCount.push(res)
                        appointmentModel.count({createdAt: { $gte: new Date(`${year}-05-01`), $lt: new Date(`${year}-06-01`) }}).then(res=>{
                            appointmentCount.push(res)
                            appointmentModel.count({createdAt: { $gte: new Date(`${year}-06-01`), $lt: new Date(`${year}-07-01`) }}).then(res=>{
                                appointmentCount.push(res)
                                appointmentModel.count({createdAt: { $gte: new Date(`${year}-07-01`), $lt: new Date(`${year}-08-01`) }}).then(res=>{
                                    appointmentCount.push(res)
                                    appointmentModel.count({createdAt: { $gte: new Date(`${year}-08-01`), $lt: new Date(`${year}-09-01`) }}).then(res=>{
                                        appointmentCount.push(res)
                                        appointmentModel.count({createdAt: { $gte: new Date(`${year}-09-01`), $lt: new Date(`${year}-10-01`) }}).then(res=>{
                                            appointmentCount.push(res)
                                            appointmentModel.count({createdAt: { $gte: new Date(`${year}-10-01`), $lt: new Date(`${year}-11-01`) }}).then(res=>{
                                                appointmentCount.push(res)
                                                appointmentModel.count({createdAt: { $gte: new Date(`${year}-11-01`), $lt: new Date(`${year}-12-01`) }}).then(res=>{
                                                    appointmentCount.push(res)
                                                    appointmentModel.count({createdAt: { $gte: new Date(`${year}-12-01`), $lt: new Date(`${year}-12-31`) }}).then(res=>{
                                                        appointmentCount.push(res)
                                                        resolve(appointmentCount)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}


export const getAppointmentCountDoctor = (id)=>{
    return new Promise((resolve,reject)=>{
        let appointmentCount = []
        const year = new Date().getFullYear()
        appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year}-02-01`) }}).then(res=>{
            appointmentCount.push(res)
            appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-02-01`), $lt: new Date(`${year}-03-01`) }}).then(res=>{
                appointmentCount.push(res)
                appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-03-01`), $lt: new Date(`${year}-04-01`) }}).then(res=>{
                    appointmentCount.push(res)
                    appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-04-01`), $lt: new Date(`${year}-05-01`) }}).then(res=>{
                        appointmentCount.push(res)
                        appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-05-01`), $lt: new Date(`${year}-06-01`) }}).then(res=>{
                            appointmentCount.push(res)
                            appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-06-01`), $lt: new Date(`${year}-07-01`) }}).then(res=>{
                                appointmentCount.push(res)
                                appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-07-01`), $lt: new Date(`${year}-08-01`) }}).then(res=>{
                                    appointmentCount.push(res)
                                    appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-08-01`), $lt: new Date(`${year}-09-01`) }}).then(res=>{
                                        appointmentCount.push(res)
                                        appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-09-01`), $lt: new Date(`${year}-10-01`) }}).then(res=>{
                                            appointmentCount.push(res)
                                            appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-10-01`), $lt: new Date(`${year}-11-01`) }}).then(res=>{
                                                appointmentCount.push(res)
                                                appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-11-01`), $lt: new Date(`${year}-12-01`) }}).then(res=>{
                                                    appointmentCount.push(res)
                                                    appointmentModel.count({doctorId:id,createdAt: { $gte: new Date(`${year}-12-01`), $lt: new Date(`${year}-12-31`) }}).then(res=>{
                                                        appointmentCount.push(res)
                                                        resolve(appointmentCount)
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}