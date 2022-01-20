const carMakers: string[] = ['ford','toyota','bmw'];
const carDealers = []; //any[]
const dates = [new Date(), new Date()];
const carsByMake: string[][] = [
    ['focus','mondeo'],
    ['corolla', 'yaris'],
    ['z4', '316']
];

// Help with inference when extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// prevent incompatible values
carMakers.push(100);

// Help with 'map'
carMakers.map((car: string): string =>{
    return car;
})

// Flexible Types
const importantDates: (Date | string)[] = [new Date()];
importantDates.push('2020-10-10');
importantDates.push(new Date());
importantDates.push(100);