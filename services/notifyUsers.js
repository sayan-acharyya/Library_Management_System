// import cron from "node-cron";
// import { Borrow } from "../models/borrow.model.js";
// import { User } from "../models/user.model.js";
// import { sendEmail } from "../utils/sendEmail.js";

// export const notifyUsers = () => {
//     cron.schedule("*/5 * * * * *", async () => {
//         try {
//             const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//             const borrowers = await Borrow.find({
//                 dueDate: {
//                     $lt: oneDayAgo
//                 },
//                 returnDate: null,
//                 notified: false,
//             })

//             for(const element of borrowers){
//                 if(element.user && element.user.email){
//                     const user = await User.findById(element.user.id);
//                     sendEmail({
//                         email:element.user.email,
//                         subject:"Book returned successfully",
//                         message:`Hello ${element.user.name} , \n\nThis is a reminder that the book you borrowed is due for return today. please return the book to the library as soon as possible.\n\nThank you.`
//                     });
//                     element.notified = true;
//                     await element.save(); 
//                 }
//             }
//         } catch (error) {
//              console.error("Some error occured while notifying users.",error);
//         }
//     })
// }

// 
import cron from "node-cron";
import { Borrow } from "../models/borrow.model.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () => {
    cron.schedule("*/30 * * * *", async () => {
        try {
            const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

            const borrowers = await Borrow.find({
                dueDate: { $lt: oneDayAgo },
                returnDate: null,
                notified: false,
            }).populate('user');  // Populate user field

            for (const element of borrowers) {
                const user = element.user;

                if (user && user.email) { 
                    await sendEmail({
                        email: user.email,
                        subject: "Book Return Reminder",
                        message: `Hello ${user.name},\n\nThis is a reminder that the book you borrowed is due for return today. Please return the book to the library as soon as possible.\n\nThank you.\n\nLibrary Team`
                    });

                    element.notified = true;
                    await element.save();
                }
            }
        } catch (error) {
            console.error("Error occurred while notifying users:", error);
        }
    });
};
















