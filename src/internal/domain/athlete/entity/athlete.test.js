import { describe, it, expect } from "@jest/globals"
import { Athlete } from "./athlete.js"
import { Team } from "../../team/entity/team.js"
import { TeamID } from "../../team/entity/team.id.js"

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

    it("should change a name", () => {
        const { name, country, birthday } = mockData();
        
        const athlete = new Athlete({ name, country: country, birthday: birthday });
        expect(athlete).toBeDefined()
        expect(athlete.name).toStrictEqual(name)
        expect(athlete.country).toStrictEqual(country)
        expect(athlete.birthday).toStrictEqual(birthday)
        
        const expectedName = "Updated name"

        athlete.changeName(expectedName)

        expect(athlete.name).toStrictEqual(expectedName)
    })

    it("should change country", () => {
        const { name, country, birthday } = mockData();
        
        const athlete = new Athlete({ name, country: country, birthday: birthday });
        expect(athlete).toBeDefined()
        expect(athlete.name).toStrictEqual(name)
        expect(athlete.country).toStrictEqual(country)
        expect(athlete.birthday).toStrictEqual(birthday)

        const expectedCountry = "updated country"

        athlete.changeCountry(expectedCountry)

        expect(athlete.country).toStrictEqual(expectedCountry)
    })

    it("should change birthday", () => {
        const { name, country, birthday } = mockData();
        
        const athlete = new Athlete({ name, country: country, birthday: birthday });
        expect(athlete).toBeDefined()
        expect(athlete.name).toStrictEqual(name)
        expect(athlete.country).toStrictEqual(country)
        expect(athlete.birthday).toStrictEqual(birthday)

        const expectedBirthday = new Date(2023, 1 - 1, 1)

        athlete.changeBirthday(expectedBirthday)
        
        expect(athlete.birthday).toStrictEqual(expectedBirthday)
    })

    it("should change a team", () => {
        const team = new Team({id: TeamID.from("123"), name: "Astana"});

        const { expectedName, expectedCountry, expectedBirthday } = mockData();
        
        const athlete = new Athlete({ name: expectedName, country: expectedCountry, birthday: expectedBirthday });
        expect(athlete).toBeDefined()
        expect(athlete.team).toBeUndefined()

        athlete.changeTeam(team)
        expect(athlete.team).toStrictEqual(team)
    })

    it("should remove a team", () => {
        const team = new Team({id: TeamID.from("123"), name: "Astana"});

        const { expectedName, expectedCountry, expectedBirthday } = mockData();
        
        const athlete = new Athlete({ name: expectedName, country: expectedCountry, birthday: expectedBirthday });
        expect(athlete).toBeDefined()
        expect(athlete.team).toBeUndefined()

        athlete.changeTeam(team)
        expect(athlete.team).toStrictEqual(team)

        athlete.removeTeam(team);
        expect(athlete.team).toBeNull()
    });

    it("should throw error if team is invalid", () => {
        const team = new Team({id: TeamID.from("123"), name: "Astana"});

        const { expectedName, expectedCountry, expectedBirthday } = mockData();
        
        const athlete = new Athlete({ name: expectedName, country: expectedCountry, birthday: expectedBirthday });
        expect(athlete).toBeDefined()
        expect(athlete.team).toBeUndefined()

        athlete.changeTeam(team)
        expect(athlete.team).toStrictEqual(team)

        const invalidTeam = new Team({id: TeamID.from("234"), name: "Cofidis"});

        expect(() =>athlete.removeTeam(invalidTeam)).toThrowError("Invalid team");
    })
})