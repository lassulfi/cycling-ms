import { jest, describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { AthleteID } from "../../../domain/athlete/entity/athlete.id.js";
import { UpdateAthleteUseCase } from "./update.athlete.usecase.js";
import { TeamID } from "../../../domain/team/entity/team.id.js";
import { Team } from "../../../domain/team/entity/team.js";
import { Athlete } from "../../../domain/athlete/entity/athlete.js";
import { Birthday } from "../../../domain/@shared/value-objects/birthday.js";

const MockRepository = () => ({
    findOne: jest.fn(),
    update: jest.fn(),
})

let input

beforeEach(() => {
    input = {
        id: "123",
        name: "Mark Cavendish",
        country: "England",
        birthday: {
            day: 21,
            month: 5,
            year: 1985
        },
        teamId: "123",
    }
})

afterEach(() => {
    jest.clearAllMocks()
})

describe("Update athlete unit tests", () => {
    it("should update an athlete", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const usecase = new UpdateAthleteUseCase({ athleteRepository, teamRepository })

        const { id, name, country, birthday, teamId } = input

        const team = new Team({
            id: TeamID.from("123"),
            name: "Astana"
        })

        const athlete = new Athlete({
            id: AthleteID.from("123"),
            name: "Invalid name",
            country: "Invalid country",
            birthday: Birthday.newBirthday({
                day: 1,
                month: 1,
                year: 2023
            })
        })

        const findAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockResolvedValue(athlete)

        const findTeamSpy = jest.spyOn(teamRepository, "findOne").mockResolvedValue(team)

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        const output = await usecase.execute(input)

        expect(output).toStrictEqual({
            id,
            name,
            country,
            birthday: new Date(birthday.year, birthday.month - 1, birthday.day),
            team: {
                id: team.id.getValue(),
                name: team.name,
            }
        })
        expect(findAthleteSpy).toBeCalledWith({ id: AthleteID.from(id) })
        expect(findTeamSpy).toBeCalledWith({ id: TeamID.from(teamId) })
        expect(updateAthleteSpy).toBeCalledTimes(1)

    })

    it("should keep persisted values if no new values where informed", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const usecase = new UpdateAthleteUseCase({ athleteRepository, teamRepository })

        const { id } = input

        const team = new Team({
            id: TeamID.from("123"),
            name: "Astana"
        })

        const athlete = new Athlete({
            id: AthleteID.from("123"),
            name: "Invalid name",
            country: "Invalid country",
            birthday: Birthday.newBirthday({
                day: 1,
                month: 1,
                year: 2023
            })
        })
        athlete.changeTeam(team)

        const findAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockResolvedValue(athlete)

        const findTeamSpy = jest.spyOn(teamRepository, "findOne").mockResolvedValue(team)

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        const output = await usecase.execute(input)

        expect(output).toStrictEqual({
            id,
            name: athlete.name,
            country: athlete.country,
            birthday: athlete.birthday.date,
            team: {
                id: team.id.getValue(),
                name: team.name,
            }
        })
        expect(findAthleteSpy).toBeCalledWith({ id: AthleteID.from(id) })
        expect(findTeamSpy).toBeCalledWith({ id: TeamID.from(null) })
        expect(updateAthleteSpy).toBeCalledTimes(1)
    })

    it("should not update athlete given athlete ID is invalid", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const usecase = new UpdateAthleteUseCase({ athleteRepository, teamRepository })

        const { id } = input

        const findAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockRejectedValue(new Error(`Athlete ID "${id}" not found`))

        const findTeamSpy = jest.spyOn(teamRepository, "findOne")

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        await expect(usecase.execute(input)).rejects.toThrow(new Error(`Error while updating athlete: Athlete ID "${id}" not found`))
        expect(findAthleteSpy).toBeCalledWith({id: AthleteID.from(id)})
        expect(findTeamSpy).not.toBeCalled()
        expect(updateAthleteSpy).not.toBeCalled()
    })

    it("should not update athlete given team repository throws an error", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const usecase = new UpdateAthleteUseCase({ athleteRepository, teamRepository })

        const { id, teamId } = input

        const athlete = new Athlete({
            id: AthleteID.from("123"),
            name: "Invalid name",
            country: "Invalid country",
            birthday: Birthday.newBirthday({
                day: 1,
                month: 1,
                year: 2023
            })
        })

        const findAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockResolvedValue(athlete)

        const findTeamSpy = jest.spyOn(teamRepository, "findOne").mockRejectedValue(new Error("Error while retrieving team"))

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update")

        await expect(usecase.execute(input)).rejects.toThrow(new Error("Error while updating athlete: Error while retrieving team"))
        expect(findAthleteSpy).toBeCalledWith({id: AthleteID.from(id)})
        expect(findTeamSpy).toBeCalledWith({ id: TeamID.from(teamId) })
        expect(updateAthleteSpy).not.toBeCalled()
    })

    it("should not update athlete given team repository update throws error", async () => {
        const athleteRepository = MockRepository()
        const teamRepository = MockRepository()

        const usecase = new UpdateAthleteUseCase({ athleteRepository, teamRepository })

        const { id, name, country, birthday, teamId } = input

        const team = new Team({
            id: TeamID.from("123"),
            name: "Astana"
        })

        const athlete = new Athlete({
            id: AthleteID.from("123"),
            name: "Invalid name",
            country: "Invalid country",
            birthday: Birthday.newBirthday({
                day: 1,
                month: 1,
                year: 2023
            })
        })

        const findAthleteSpy = jest.spyOn(athleteRepository, "findOne").mockResolvedValue(athlete)

        const findTeamSpy = jest.spyOn(teamRepository, "findOne").mockResolvedValue(team)

        const updateAthleteSpy = jest.spyOn(athleteRepository, "update").mockRejectedValue(new Error("Error while updating athlete"))

        await expect(usecase.execute(input)).rejects.toThrow(new Error("Error while updating athlete: Error while updating athlete"))
        expect(findAthleteSpy).toBeCalledWith({id: AthleteID.from(id)})
        expect(findTeamSpy).toBeCalledWith({ id: TeamID.from(teamId) })
        expect(updateAthleteSpy).toBeCalledWith(athlete)
    })
})