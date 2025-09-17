export const calculateFine = (dueDate) => {
    const findPerHour = 0.1; //10 cent
    const today = new Date();

    if (today > dueDate) {
        const lateHoures = Math.ceil((today - dueDate) / (1000 * 60 * 60));
        const fine = lateHoures * findPerHour;
        return fine;
    }
    
   return 0;
}