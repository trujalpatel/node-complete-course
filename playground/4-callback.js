setTimeout(() => {
    console.log('2 seconds up....!!');
}, 2000)

const geoCode = (address, callBack) => {
    setTimeout(() => {
        const data = {
        latitude: 0,
        longitude:0
    }
    callBack(data);
    }, 2000)
}

const testData  = geoCode('jhalod',(data) => {
    console.log(data);
});


const add = (val1,val2, callBack) => {
    setTimeout(() => {
        const sum = val1+val2;
    callBack(sum);
    }, 2000)
}

const sumData  = add(1,2,(sum) => {
    console.log(sum);
})