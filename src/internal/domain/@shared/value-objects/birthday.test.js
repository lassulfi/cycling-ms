import { describe, it, expect } from "@jest/globals"
import { Birthday } from "./birthday.js"

describe("# Birthday unit tests", () => {
    it("should create a birthday", () => {
        const birthday = new Birthday({
            day: 1,
            month: 1,
            year: 2023,
        })

        expect(birthday).toBeDefined()
        expect(birthday.day).toBe(1)
        expect(birthday.month).toBe(1)
        expect(birthday.year).toBe(2023)
        expect(birthday.date).toStrictEqual(new Date(2023, 0, 1))
    })

    describe("Invalid date tests", () => {
        it("should throw error for invalid year", () => {
            const day = 1;
            const month = 1;
            const year = -1;

            expect(() => {const birthday = new Birthday({day, month, year})}).toThrowError("Invalid year")
        })

        it ("should throw error for invalid month", () => {
            const day = 1;
            const year = 2023;

            expect(() => {const birthday = new Birthday({day, month: 0, year})}).toThrowError("Invalid month")
            expect(() => {const birthday = new Birthday({day, month: 13, year})}).toThrowError("Invalid month")
        })

        it("should throw error for invalid day", () => {
            const year = 2023;

            expect(() => {const birthday = new Birthday({day: 0, month: 1, year})}).toThrowError("Invalid day")
            
            const day = 32;
            
            for (let i = 1; i <= 12; i++) {
                expect(() => {const birthday = new Birthday({day, month: i, year})}).toThrowError("Invalid day for the given month")
            }
        })
    })
})