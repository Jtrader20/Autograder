class Train {
    constructor(type, speed, cars) {
        this.type = type;
        this.speed = speed;
        this.cars = cars;
        this.passengers = 0;
    }

    addPassengers(count) {
        this.passengers += count; // No validation for negative passengers
    }

    boostSpeed(amount) {
        this.speed += amount; // No validation for negative speed boosts
    }
}

module.exports = Train;