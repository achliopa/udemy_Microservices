const apples: number = 5;
let speed: string = 'fast';
speed = 'slow';
let nothingMuch: null = null;

// built in obj
let now: Date = new Date();

//Array
let colors: string[] = ['red','green','blue'];
let luckyNums: number[] = [1,2,3];

//Classes
class Car {
    
}

let car: Car = new Car();

//Object Literal
let point: { x: number; y: number } = {
    x: 10,
    y: 20
};


//Function
const logNumber: (i:number) => void = (i: number) => {
  console.log(i);  
};