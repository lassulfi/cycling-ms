import { jest, describe, it, expect, afterEach } from "@jest/globals";
import { GetAthleteUseCase } from "./get.athlete.usecase.js";
import { AthleteFactory } from "../../../../domain/athlete/factory/athlete.factory.js";
import { AthleteID } from "../../../../domain/athlete/entity/athlete.id.js";

const MockRepository = () => ({
    findOne: jest.fn(),
})

afterEach(() => {
    jest.clearAllMocks();
})

describe("Get athlete use case unit tests", () => {
    it("should get an athlete by id", async () => {
        const athlete = AthleteFactory.newAthlete({
            name: "Mark Cavendish",
            country: "England",
            birthday: {
                day: 21,
                month: 5,
                year: 1985
            }
        })

        const athleteRepository = MockRepository()

        const getAthleteUseCase = new GetAthleteUseCase({ athleteRepository })

        const getSpy = jest.spyOn(athleteRepository, "findOne").mockReturnValue(athlete)

        const output = await getAthleteUseCase.execute({ id: athlete.id })

        expect(output).toStrictEqual({
            id: athlete.id.getValue(),
            name: athlete.name,
            country: athlete.country,
            birthday: athlete.birthday.date
        })
        expect(getSpy).toBeCalledWith({ id: athlete.id })
    })
    it("should not retrieve error if repository throws error", async () => {
        const athleteRepository = MockRepository()

        const getAthleteUseCase = new GetAthleteUseCase({ athleteRepository })

        const getSpy = jest.spyOn(athleteRepository, "findOne").mockRejectedValue(new Error("Athlete not found"))

        await expect(getAthleteUseCase.execute({ id: AthleteID.from("123") })).rejects.toThrow(new Error('Error retrieving athlete with ID "123": Athlete not found'))
        expect(getSpy).toBeCalledWith({ id: AthleteID.from("123") })
    })
})