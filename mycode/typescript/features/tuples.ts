const drink = {
  color:   'brown',
  carbonated: true,
  sugar: 40
};

//tuple annotation: specific order of types
const pepsi: [string, boolean, number] = ['brown', true, 40];

// type alias
type Drink = [string,boolean,number];
const sprite: Drink = ['clear', true, 30];

const carSpecs: [number,number] = [400, 3354];

const carStats = {
  horsePower: 400,
  weight: 3354
};