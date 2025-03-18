class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.mileage = 0;
    }

    drive(miles) {
        if (miles < 0) throw new Error("Miles cannot be negative");
        this.mileage += miles;
    }
}

module.exports = Car;
