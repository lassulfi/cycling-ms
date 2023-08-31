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
})