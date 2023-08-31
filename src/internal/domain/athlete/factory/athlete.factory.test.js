import { describe, it, expect } from "@jest/globals";
import { AthleteFactory } from "./athlete.factory.js";

const mockData = () => ({ id: "123", name: "Mark Cavendish", country: "England", birthday: { day: 21, month: 5, year: 1985 } });

describe("# Athlete factory unit tests", () => {
    it("should create a new athlete", () => {
        const { id, name, country, birthday: { day, month, year } } = mockData();

        const athlete = AthleteFactory.newAthlete({
            id, name, country, birhtday: {
                day, month, year
            }
        })

        expect(athlete).toBeDefined()
        expect(athlete.id).toBeDefined()
        expect(athlete.name).toStrictEqual(name)
        expect(athlete.country).toStrictEqual(country)
        expect(athlete.birthday.date).toStrictEqual(new Date(year, month - 1, day))
    })

})