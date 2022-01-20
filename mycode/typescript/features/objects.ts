const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age: number):void {
        this.age = age;
    }
};

//desctructe object ES 2015 style + TS annotation
const { age }: { age: number} = profile;
// 2 levels deep descructuring + TS annotation
const {coords: {lat, lng } }: {coords: { lat: number; lng: number}} = profile;