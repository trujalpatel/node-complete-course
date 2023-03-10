const calculateTip = (total, tipPercentage = .3) =>  total + (total * tipPercentage);

const fahrenheitToCelsius = (temp) => {
    return (temp - 32) / 1.8
}

const celsiusToFahrenheit = (temp) => {
    return (temp * 1.8) + 32
}

const add = (a, b) => {
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
               return reject('Number must be positive ');
            }
             resolve(a + b);
        }, 2000)
    });
}

// const calculateTip = (total, tipPercentage) => {
//     const tip = total * tipPercentage;
//     return total + tip;
// }

module.exports = {
    calculateTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit,
    add
}