const Car = require("./car");

describe("Car Class", () => {
    let myCar;

    beforeEach(() => {
        myCar = new Car("Toyota", "Corolla", 2020);
    });

    test("should create a new car instance", () => {
        expect(myCar.make).toBe("Toyota");
        expect(myCar.model).toBe("Corolla");
        expect(myCar.year).toBe(2020);
        expect(myCar.mileage).toBe(0);
    });

    test("should increase mileage when driven", () => {
        myCar.drive(100);
        expect(myCar.mileage).toBe(100);
    });

    test("should throw an error for negative miles", () => {
        expect(() => myCar.drive(-10)).toThrow("Miles cannot be negative");
    });
});
