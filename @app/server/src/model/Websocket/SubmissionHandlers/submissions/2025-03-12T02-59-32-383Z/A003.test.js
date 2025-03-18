const Train = require("./train");

describe("Train Class", () => {
    let myTrain;

    beforeEach(() => {
        myTrain = new Train("Bullet", 300, 10);
    });

    test("should create a new train instance", () => {
        expect(myTrain.type).toBe("Bullet");
        expect(myTrain.speed).toBe(300);
        expect(myTrain.cars).toBe(10);
        expect(myTrain.passengers).toBe(0);
    });

    test("should add passengers correctly", () => {
        myTrain.addPassengers(50);
        expect(myTrain.passengers).toBe(50);
    });

    test("should not allow negative passengers", () => {
        expect(() => myTrain.addPassengers(-5)).toThrow("Passenger count cannot be negative");
    });

    test("should increase speed when boosted", () => {
        myTrain.boostSpeed(50);
        expect(myTrain.speed).toBe(350);
    });

    test("should not allow speed boost with negative value", () => {
        expect(() => myTrain.boostSpeed(-20)).toThrow("Speed boost cannot be negative");
    });
});
