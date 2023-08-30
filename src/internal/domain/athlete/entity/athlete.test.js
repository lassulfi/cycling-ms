import { describe, it, expect } from "@jest/globals"
import { Athlete } from "./athlete.js"

const mockData = () => ({ name: "Mark Cavendish", country: "England", birthday: new Date(1985, 5 - 1, 21) })

describe("# Athlete entity unit tests", () => {
    it("should create an athlete", () => {
        const { expectedName, expectedCountry, expectedBirthday } = mockData();
        
        const athlete = new Athlete({ name: expectedName, country: expectedCountry, birthday: expectedBirthday });
        expect(athlete).toBeDefined()
        expect(athlete.name).toStrictEqual(expectedName)
        expect(athlete.country).toStrictEqual(expectedCountry)
        expect(athlete.birthday).toStrictEqual(expectedBirthday)
    })
})