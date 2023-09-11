import { jest, describe, it, expect, beforeEach, afterEach } from "@jest/globals"
import AthleteController from "./athlete.controller.js"
import { AthleteID } from "../../../domain/athlete/entity/athlete.id.js"

const UseCaseMock = () => ({
    execute: jest.fn()
})

let createAthleteUseCase, getAthleteUseCase, updateAthleteUseCase

const mockResponse = {
    json: jest.fn(),
    status: jest.fn(function (code) {
        this.statusCode = code

        return this
    })
}

beforeEach(() => {
    createAthleteUseCase = UseCaseMock()
    getAthleteUseCase = UseCaseMock()
    updateAthleteUseCase = UseCaseMock()
})

afterEach(() => {
    jest.clearAllMocks()
})

describe("# Athlete controller unit tests", () => {
    describe("# create method tests", () => {
        it("should process request with success", async () => {
            const controller = new AthleteController({
                createAthleteUseCase,
                getAthleteUseCase,
                updateAthleteUseCase
            })

            const input = {
                name: "Athlete",
                country: "Country",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                }
            }

            const output = { id: "123" }

            const mockRequest = {
                body: input
            }

            const createSpy = jest.spyOn(createAthleteUseCase, "execute").mockResolvedValue(output)
            const getSpy = jest.spyOn(getAthleteUseCase, "execute")
            const updateSpy = jest.spyOn(updateAthleteUseCase, "execute")

            const responseJsonSpy = jest.spyOn(mockResponse, "json")

            await controller.create(mockRequest, mockResponse)

            expect(createSpy).toHaveBeenCalledWith(input)
            expect(getSpy).not.toBeCalled()
            expect(updateSpy).not.toBeCalled()
            expect(responseJsonSpy).toHaveBeenCalledWith(output)
        })
    })

    describe("# get by id unit tests", () => {
        it("should retrieve athlete given a valid id", async () => {
            const controller = new AthleteController({
                createAthleteUseCase,
                getAthleteUseCase,
                updateAthleteUseCase
            })

            const input = { id: 123 }

            const output = {
                id: 123,
                name: "Athlete",
                country: "Country",
                birthday: new Date(2023, 1, 1)
            }

            const mockRequest = {
                params: input
            }

            const createSpy = jest.spyOn(createAthleteUseCase, "execute")
            const getSpy = jest.spyOn(getAthleteUseCase, "execute").mockResolvedValue(output)
            const updateSpy = jest.spyOn(updateAthleteUseCase, "execute")

            const responseJsonSpy = jest.spyOn(mockResponse, "json")

            await controller.getById(mockRequest, mockResponse)

            expect(createSpy).not.toBeCalled()
            expect(getSpy).toHaveBeenCalledWith({ id: AthleteID.from(input.id) })
            expect(updateSpy).not.toBeCalled()
            expect(responseJsonSpy).toHaveBeenCalledWith(output)
        })

        it("should not retrieve an athlete given an invalid id", async () => {
            const controller = new AthleteController({
                createAthleteUseCase,
                getAthleteUseCase,
                updateAthleteUseCase
            })

            const input = { id: 123 }

            const mockRequest = {
                params: input
            }

            const createSpy = jest.spyOn(createAthleteUseCase, "execute")
            const getSpy = jest.spyOn(getAthleteUseCase, "execute").mockRejectedValue(new Error(`Error retrieving athlete with ID "${input.id}": Athlete not found`))
            const updateSpy = jest.spyOn(updateAthleteUseCase, "execute")

            const responseJsonSpy = jest.spyOn(mockResponse, "json")
            const statusSpy = jest.spyOn(mockResponse, "status")

            await controller.getById(mockRequest, mockResponse)

            expect(createSpy).not.toBeCalled()
            expect(getSpy).toHaveBeenCalledWith({ id: AthleteID.from(input.id) })
            expect(updateSpy).not.toBeCalled()
            expect(responseJsonSpy).toHaveBeenCalledWith({
                error: `Error retrieving athlete with ID "${input.id}": Athlete not found`
            })
            expect(statusSpy).toHaveBeenCalledWith(404)
        })
    })

    describe("# update method unit tests", () => {
        it("should update an athlete with success", async () => {
            const controller = new AthleteController({
                createAthleteUseCase,
                getAthleteUseCase,
                updateAthleteUseCase
            })

            const id = "123"

            const input = {
                name: "Athlete",
                country: "Country",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                },
                teamId: "234"
            }

            const output = {
                id,
                name: "Athlete",
                country: "Country",
                birthday: new Date(2023, 1, 1),
                team: {
                    id: "234",
                    name: "Team"
                }
            }

            const mockRequest = {
                params: { id },
                body: input
            }

            const createSpy = jest.spyOn(createAthleteUseCase, "execute")
            const getSpy = jest.spyOn(getAthleteUseCase, "execute")
            const updateSpy = jest.spyOn(updateAthleteUseCase, "execute").mockResolvedValue(output)

            const responseJsonSpy = jest.spyOn(mockResponse, "json")

            await controller.update(mockRequest, mockResponse)

            expect(createSpy).not.toBeCalled()
            expect(getSpy).not.toBeCalled()
            expect(updateSpy).toHaveBeenCalledWith({ id, ...input })
            expect(responseJsonSpy).toHaveBeenCalledWith(output)
        })
    })
})