// switch statements

// ========== 6.24.2025 =============

//used in log if...else statements
// if(num === 2){
//     //logic
// }else if(num === 3){
//     //logic
// }else if(num === 4{
//     //logic
// }else{
//     //logic
// }


// I give s number for a month, log the month name
function giveMonth(num){
    switch(num){
        case 1: {
            return "January"
        }
        case 2: {
           return "Febuary"
        }
        case 3: return "March"
        case 4: return "April"  
        case 5: return "May" 
        case 6: return "June" 
        case 7: return "July" 
        case 8: return "August" 
        case 9: return "September"  
        case 10: return "October" 
        case 11: return "November" 
        case 12: return "December" 
    }
}
console.log(giveMonth(4))