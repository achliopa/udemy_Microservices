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

//when to use annotations
// 1) function that returns the 'any' type
const json = '"x": 10,"y":20';
const coordinates: { x: number, y: number} = JSON.parse(json);
console.log(coordinates);

// 2) when we declare a var on one line and init it on another line
let words = ['red', 'green', 'blue'];
let foundWord: boolean; 

for (let i; i < words.length; i++) {
  if (words[i] === 'greem'){
    foundWord = true;
  }
}

// 3) var whose type cannot be inferred correctly
let numbers = [10,-1,12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i];
  }
}