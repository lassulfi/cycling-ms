import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { CreateTeamUseCase } from "./create.team.usecase.js"
import { AthleteFactory } from "../../../domain/athlete/factory/athlete.factory"
import { Athlete } from "../../../domain/athlete/entity/athlete.js"

const MockRepository = () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn()
})

let input

beforeEach(() => {
    input = {
        name: "Astana",
        athletesId: ["123", "234"]
    }
})

afterEach(() => {
    jest.clearAllMocks()
})

describe("# Create team use case unit tests", () => {
    it("should create a team", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const useCase = new CreateTeamUseCase({teamRepository, athleteRepository})

        const athletes = [
            new Athlete({id: "123", name: "Athlete 1", country: "Country 1", birthday: {day: 1, month: 1, year: 2023}}),
            new Athlete({id: "234", name: "Athlete 2", country: "Country 2", birthday: {day: 1, month: 1, year: 2023}}),
        ]

        const findOneAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockImplementation(({id}) => {
            if (id === "123") return athletes[0]
            if (id === "234") return athletes[1]
        })

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        const createTeamSpy = jest.spyOn(teamRepository, "create")

        const output = await useCase.execute(input)

        expect(output).toStrictEqual({
            id: expect.any(String)
        })

        expect(findOneAthleteSpy).toHaveBeenCalledTimes(2)
        expect(updateAthleteSpy).toHaveBeenCalledTimes(2)
        expect(createTeamSpy).toHaveBeenCalled()
    })

    it ("should not create a team given team repository create throws an error", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const useCase = new CreateTeamUseCase({teamRepository, athleteRepository})

        const athletes = [
            new Athlete({id: "123", name: "Athlete 1", country: "Country 1", birthday: {day: 1, month: 1, year: 2023}}),
            new Athlete({id: "234", name: "Athlete 2", country: "Country 2", birthday: {day: 1, month: 1, year: 2023}}),
        ]

        const findOneAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockImplementation(({id}) => {
            if (id === "123") return athletes[0]
            if (id === "234") return athletes[1]
        })

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        const createTeamSpy = jest.spyOn(teamRepository, "create").mockRejectedValue(new Error("Database offline"))

        await expect(useCase.execute(input)).rejects.toThrow("Error while creating team: Database offline")

        expect(findOneAthleteSpy).toHaveBeenCalledTimes(2)
        expect(updateAthleteSpy).toHaveBeenCalledTimes(2)
        expect(createTeamSpy).toHaveBeenCalled()
    })

    it ("should not create a team given athlete repository find one throws an error", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const useCase = new CreateTeamUseCase({teamRepository, athleteRepository})

        const findOneAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockRejectedValue(new Error("Database offline"))

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        const createTeamSpy = jest.spyOn(teamRepository, "create")

        await expect(useCase.execute(input)).rejects.toThrow("Error while creating team: Database offline")

        expect(findOneAthleteSpy).toHaveBeenCalled()
        expect(updateAthleteSpy).not.toBeCalled()
        expect(createTeamSpy).not.toBeCalled()
    })

    it ("should not create a team given athlete repository update throws an error", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const useCase = new CreateTeamUseCase({teamRepository, athleteRepository})

        const athletes = [
            new Athlete({id: "123", name: "Athlete 1", country: "Country 1", birthday: {day: 1, month: 1, year: 2023}}),
        ]

        const findOneAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockResolvedValue(athletes[0])

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update").mockRejectedValue(new Error("Database offline"))

        const createTeamSpy = jest.spyOn(teamRepository, "create")

        await expect(useCase.execute(input)).rejects.toThrow("Error while creating team: Database offline")

        expect(findOneAthleteSpy).toHaveBeenCalledTimes(2)
        expect(updateAthleteSpy).toHaveBeenCalledTimes(1)
        expect(createTeamSpy).not.toHaveBeenCalled()
    })
})