import { describe, it , expect } from "@jest/globals"
import { TeamFactory } from "./team.factory.js"

describe("# Team factory unit tests", () => {
    it("should create a team", () => {
        const team = TeamFactory.newTeam("Cofidis")

        expect(team).toBeDefined();
        expect(team.id).toBeDefined();
        expect(team.name).toStrictEqual("Cofidis")
        expect(team.athletes).toBeDefined()
        expect(team.athletes.length).toBe(0)
    })
})