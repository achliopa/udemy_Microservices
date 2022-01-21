class Vehicle {
    // color: string;
    
    // constructor(color: string) {
    //     this.color = color
    // }
    constructor(public color: string) {
    }
    
    public honk(): void {
        console.log('beeep');
    }
}

class Car extends Vehicle {
    constructor(public wheels: number, color: string){
        super(color);
    }
    
    private drive(): void {
        console.log('grrrrrr');
    }
    
    startDrivingProcess(): void {
        this.drive();
    }
}

const vehicle = new Vehicle('orange');
vehicle.honk();
console.log(vehicle.color);

const car = new Car(4, 'black');
car.startDrivingProcess();
car.honk();