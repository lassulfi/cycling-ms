import { describe, it, expect, jest, beforeEach, afterEach } from "@jest/globals"
import { CreateAthleteUseCase } from "./create.athlete.js"

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
})