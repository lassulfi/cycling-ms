import { jest, describe, it, beforeEach, afterEach } from "@jest/globals"
import TeamController from "./team.controller.js"

const UseCaseMock = () => ({
    execute: jest.fn()
})

let createTeamUseCase

const mockResponse = {
    json: jest.fn(),
    status: jest.fn(function(code) {
        this.statusCode = code
        
        return this
    })
}

beforeEach(() => {
    createTeamUseCase = UseCaseMock()
})

afterEach(() => {
    jest.clearAllMocks()
})

describe("# Team controller unit tests", () => {
    describe("# create method unit tests", () => {
        it("should create a team with success", async () => {
            const controller = new TeamController({
                createTeamUseCase
            })

            const input = {
                name: "Team",
                athletesId: ["123", "234"]
            }

            const output = {
                id: "123"
            }

            const mockRequest = {
                body: input
            }

            const createSpy = jest.spyOn(createTeamUseCase, "execute").mockResolvedValue(output)
            const responseJsonSpy = jest.spyOn(mockResponse, "json")

            await controller.create(mockRequest, mockResponse)

            expect(createSpy).toHaveBeenCalledWith(input)
            expect(responseJsonSpy).toHaveBeenCalledWith(output)
        })
    })
})