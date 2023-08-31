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