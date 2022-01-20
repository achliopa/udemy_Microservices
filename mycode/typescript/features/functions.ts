const add = (a: number, b: number): number => {
    return a + b;
};

//bug
const subtract = (a: number, b: number) => {
    //a - b;
    return a - b;
};

function divide(a: number, b: number): number {
    return a / b;
}

const multiply =  function(a: number, b: number): number {
    return a * b;
}

// return nothing
const logger = (message: string): void => {
    console.log(message);
    return undefined;
};

//async never reaching the end
const throwError = (message: string): never => {
    throw new Error(message);  
};

const todaysWeather = {
    date: new Date(),
    weather: 'sunny'
};

// vanilla JS
// const logWeather = (forecast: {date: Date, weather: string}): void => {
//     console.log(forecast.date);
//     console.log(forecast.weather);
// };

// ES 2015 destructuring annotation
const logWeather = ({date, weather}: {date: Date, weather: string}): void => {
    console.log(date);
    console.log(weather);
    
};

logWeather(todaysWeather);