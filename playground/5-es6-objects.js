// Object Property shorthand
const name = 'XYZ'
const age = 20

const user = {
    name,
    age:age,
    address:undefined
}

console.log(user);

//object Destructuing
const product = {
    label: 'Book',
    price: 22,
    sellPrice: undefined

}

// const {label:productLabel, price, sellPrice = 50} = product
// console.log(productLabel,price,sellPrice);

const transcation = (type, {label,price = 10} = {}) => {
    console.log(type,label,price);
}

transcation('testData', product)