// const square = function (x){
//     return x * x;
// }

// const square = (x) => {
//     return x*x
// };

const square = (x) => x * x;

console.log(square(9));


const event = {
    name: 'Marriage',
    guestList: ['Parth', 'Ravi', 'Bhikho'],

    printGuestList(){
        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' +this.name);
        });
    }
}

event.printGuestList();