import { describe, it, expect } from "@jest/globals"
import { TeamFactory } from "../../../../internal/domain/team/factory/team.factory.js"
import { TeamRepository } from "./team.repository.js"

describe("# Team repository unit tests", () => {
    describe("# create team method unit tests", () => {
        it("should create a team", async () => {
            const repository = new TeamRepository()

            const team = TeamFactory.newTeam({name: "Team 1"})

            const result = await repository.create(team)

            expect(result).toStrictEqual(team)

            await expect(repository.count()).resolves.toBe(1)
        })
    })
})