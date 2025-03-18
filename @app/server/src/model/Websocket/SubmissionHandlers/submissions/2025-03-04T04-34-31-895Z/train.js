class Train {
    constructor(type, speed, cars) {
        this.type = type;
        this.speed = speed;
        this.cars = cars;
        this.passengers = 0;
    }

    addPassengers(count) {
        if (count < 0) throw new Error("Passenger count cannot be negative");
        this.passengers += count;
    }

    boostSpeed(amount) {
        if (amount < 0) throw new Error("Speed boost cannot be negative");
        this.speed += amount;
    }
}

module.exports = Train;
