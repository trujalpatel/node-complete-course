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

const doWork = async () => {
    const sum = await add(-1,10);
    const sum2 = await add(sum,9);
    const sum3 = await add(sum2,50);
    return sum3;
};

doWork().then((result) => {
    console.log(result);
}).catch((e) => {
    console.log(e);
})