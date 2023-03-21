import appointmentModel from "../../model/appointmentSchema.js";
import doctorModel from "../../model/doctorSchema.js";

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