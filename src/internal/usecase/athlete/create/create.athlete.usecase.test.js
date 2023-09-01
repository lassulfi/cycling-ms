import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { CreateAthleteUseCase } from "./create.athlete.usecase.js"

let input

const MockAthleteRepository = () => ({
    create: jest.fn()
})

beforeEach(() => {
    input = {
        name: "Mark Cavendish",
        country: "England",
        birthday: {
            day: 21,
            month: 5,
            year: 1985
        }
    }
})

afterEach(() => {
    jest.clearAllMocks()
})

describe("# Create Athlete Use Case", () => {
    it("should create an athlete", async () => {
        const repository = MockAthleteRepository();

        const useCase = new CreateAthleteUseCase({ athleteRepository: repository });

        const createSpy = jest.spyOn(repository, "create")

        const output = await useCase.execute(input)

        expect(output).toBeDefined();
        expect(output).toStrictEqual({
            id: expect.any(String)
        })
        expect(createSpy).toBeCalled()
    })

    it("should not create athlete if error", async () => {
        const repository = MockAthleteRepository();

        const useCase = new CreateAthleteUseCase({ athleteRepository: repository });

        const createSpy = jest.spyOn(repository, "create").mockRejectedValue(new Error("Database offline"))

        await expect(useCase.execute(input)).rejects.toThrow(new Error("Error while creating an athlete: Database offline"))
        expect(createSpy).toBeCalled()
    })
})