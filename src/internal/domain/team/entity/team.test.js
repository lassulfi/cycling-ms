import { describe, it, expect } from "@jest/globals"
import { Team } from "./team.js"
import { TeamID } from "./team.id.js"
import { Athlete } from "../../athlete/entity/athlete.js"
import { AthleteID } from "../../athlete/entity/athlete.id.js"

const teamMock = () => ({
    id: "123",
    name: "Astana"
})

describe("# Team entity unit tests", () => {
    describe("# create teams", () => {
        it("should create a team", () => {
            const { id, name } = teamMock();
            const team = new Team({ id: TeamID.from(id), name });

            expect(team).toBeDefined()
            expect(team.id.getValue()).toEqual(id)
            expect(team.name).toStrictEqual(name)
            expect(team.athletes).toBeDefined()
            expect(team.athletes.length).toStrictEqual(0)
        })
    })

    describe("# addAthlete", () => {
        const { id, name } = teamMock();
        const team = new Team({ id: TeamID.from(id), name });

        const athlete = new Athlete({ id: AthleteID.from("123"), name: "Mark Cavendish", country: "England", birthday: new Date(1985, 5 - 1, 21) });

        team.addAthlete(athlete)

        expect(team).toBeDefined()
        expect(team.athletes.length).toStrictEqual(1)
        expect(team.athletes[0]).toStrictEqual(athlete);
    })

    describe("# removeAthlete", () => {
        const { id, name } = teamMock();
        const team = new Team({ id: TeamID.from(id), name });

        const athlete = new Athlete({ id: AthleteID.from("123"), name: "Mark Cavendish", country: "England", birthday: new Date(1985, 5 - 1, 21) });

        team.addAthlete(athlete)

        expect(team).toBeDefined()
        expect(team.athletes.length).toStrictEqual(1)
        expect(team.athletes[0]).toStrictEqual(athlete);

        team.removeAthlete(athlete)

        expect(team.athletes.length).toStrictEqual(0)
    })
})