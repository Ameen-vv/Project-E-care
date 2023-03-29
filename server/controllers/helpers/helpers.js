import appointmentModel from "../../model/appointmentSchema.js";
import doctorModel from "../../model/doctorSchema.js";
import userModel from "../../model/userSchema.js";

export const checkSlots = (slots, id) => {
    return new Promise((resolve, reject) => {
        let response = {}
        let check
        doctorModel
            .findOne({ _id: id })
            .then((doctor) => {
                let slotsArray = doctor.timings
                for (let i = 0; i < slotsArray.length; i++) {
                    if (slotsArray[i].day === slots.day) {
                        if (slotsArray[i].startTime === slots.startTime || slotsArray[i].endTime === slots.endTime) {
                            check = true
                            break
                        } else {
                            continue
                        }
                    } else {
                        continue
                    }
                }
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

export const checkingSlotsAvailability = ({ newDate, time, doctorId }) => {
    return new Promise((resolve, reject) => {
        doctorModel
            .findOne({ _id: doctorId })
            .then((doctor) => {
                let timings = doctor?.timings
                if (timings) {
                    let slot = timings.filter((slots) => {
                        let timeArr = time.split('-')
                        if (slots.startTime === timeArr[0] && slots.endTime === timeArr[1]) {
                            return slots
                        }

                    })
                    let slotCount = parseInt(slot[0].slots)
                    appointmentModel
                        .countDocuments({
                            doctorId: doctorId,
                            date: newDate,
                            slot: time
                        })
                        .then((count) => {
                            if (slotCount > count) {
                                resolve({ available: true, amount: doctor.priceOffline })
                            } else {
                                resolve({ available: false })
                            }
                        })
                }
            })
    })
}



export const getUserCountGraph = async () => {
    return new Promise((resolve, reject) => {
        const year = new Date().getFullYear();
        const userCount = [];
        for (let month = 1; month <= 12; month++) {
            const start = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
            let end;
            if (month === 12) {
                end = new Date(`${year}-12-31`);
            } else {
                end = new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-01`);
            }
            userModel
                .count({
                    createdAt: {
                        $gte: start,
                        $lt: end
                    }
                })
                .then((count) => {
                    userCount.push(count);
                })
        }
        resolve(userCount)
    })
}


export const getAppointmentCountGraph = () => {
    return new Promise((resolve, reject) => {
        const year = new Date().getFullYear();
        let appointmentCount = []
        for (let month = 1; month <= 12; month++) {
            const start = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
            let end;
            if (month === 12) {
                end = new Date(`${year}-12-31`);
            } else {
                end = new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-01`);
            }
            appointmentModel
                .count({
                    createdAt: {
                        $gte: start,
                        $lt: end
                    }
                })
                .then((count) => {
                    appointmentCount.push(count);
                })
        }
        resolve(appointmentCount)
    })
}


export const getAppointmentCountDoctor = (id) => {
    return new Promise((resolve, reject) => {
        const year = new Date().getFullYear();
        const appointmentCount = [];
        const promises = [];
        for (let month = 1; month <= 12; month++) {
            const start = new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
            let end;
            if (month === 12) {
                end = new Date(`${year}-12-31`);
            } else {
                end = new Date(`${year}-${(month + 1).toString().padStart(2, '0')}-01`);
            }
            const promise = appointmentModel
                .count({
                    doctorId: id,
                    createdAt: {
                        $gte: start,
                        $lt: end
                    }
                });
            promises.push(promise);
        }

        Promise.all(promises)
            .then((counts) => {
                for (const count of counts) {
                    appointmentCount.push(count);
                }
                resolve(appointmentCount);
            }).catch((err) => {
                reject(err);
            });
    });
}
