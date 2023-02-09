const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math');

test('should calculate total tip', () => { 
    const total = calculateTip(20, .2);
    expect(total).toBe(24);

    // if(total !== 24) {
    //     throw new Error('Total should be 24. Got ' + total)
    // }
 });

 test('should calculate total with default tip', () => { 
    const total = calculateTip(20);
    expect(total).toBe(26);
 });

 test('Should convert 32 F to 0 C', () => { 
    const temperature = fahrenheitToCelsius(32);
    expect(temperature).toBe(0);
 });

 test('Should convert 0 C to 32 F', () => { 
    const temperature = celsiusToFahrenheit(0);
    expect(temperature).toBe(32);
 });

//  test('Test Async function', (done) => {
//     setTimeout(() => {
//         expect(1).toBe(2);
//         done();
//     }, 2000);
//  });

 test('Should add two number', (done) => {
    add(5,6).then((sum) => {
        expect(sum).toBe(11);
        done();
    })
 });

 test('Should add two number async/await', async () => {
    const sum  = await add(10, 2);
    expect(sum).toBe(12);
 });


// test('Hello worls', () => {

// });

// test('This test case should be failed!!', () => {
//     throw new Error('Failure');
// });