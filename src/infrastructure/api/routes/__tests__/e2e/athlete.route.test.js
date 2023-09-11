import { describe, it, expect } from "@jest/globals"

import request from "supertest";
import app from "../../../express.js";

const PATH = "/athletes"

describe("# Ahtlete routes integration tests", () => {
    describe("# POST /athletes", () => {
        it("should be able to create a new athlete", async () => {
            const response = await request(app)
                .post(PATH)
                .send({
                    name: "Athlete 1",
                    country: "Country 1",
                    birthday: {
                        day: 1,
                        month: 1,
                        year: 2023
                    }
                })

            expect(response.status).toBe(200)
            expect(response.body.id).toBeDefined()
        })
    })
    describe("GET /athletes/:id", () => {
        it("should be able to to retrieve an athlete by id", async () => {
            const athlete = {
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                }
            }

            const createAthleteResponse = await request(app)
                .post(PATH)
                .send(athlete)

            const { id } = createAthleteResponse.body

            expect(createAthleteResponse.status).toBe(200)
            expect(id).toBeDefined()

            const path = `${PATH}/${id}`

            const getAthleteByIdResponse = await request(app)
                .get(path)

            expect(getAthleteByIdResponse.status).toBe(200)
            expect(getAthleteByIdResponse.body.id).toBe(id)
            expect(getAthleteByIdResponse.body.name).toBe(athlete.name)
            expect(getAthleteByIdResponse.body.country).toBe(athlete.country)
            expect(getAthleteByIdResponse.body.birthday).toStrictEqual(new Date(athlete.birthday.year, athlete.birthday.month - 1, athlete.birthday.day).toISOString())
        })

        it("should not retrieve an athlete given an invalid id", async () => {
            const athlete = {
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                }
            }

            const createAthleteResponse = await request(app)
                .post(PATH)
                .send(athlete)

            const { id } = createAthleteResponse.body

            expect(createAthleteResponse.status).toBe(200)
            expect(id).toBeDefined()

            const path = `${PATH}/invalid-id`

            const response = await request(app)
                .get(path)

            expect(response.status).toBe(404)
            expect(response.body).toBeDefined()
            expect(response.body.error).toBe('Error retrieving athlete with ID "invalid-id": Athlete ID "invalid-id" not found')
        })
    })
    describe("# PUT /athletes/:id", () => {
        it("should be able to update an athlete", async () => {
            const athlete = {
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                }
            }

            const createAthleteResponse = await request(app)
                .post(PATH)
                .send(athlete)

            const { id } = createAthleteResponse.body

            expect(createAthleteResponse.status).toBe(200)
            expect(id).toBeDefined()

            const path = `${PATH}/${id}`

            const body = {
                ...athlete,
                teamId: "123"
            }

            const response = await request(app)
                .put(path)
                .send(body)

            expect(response.status).toBe(200)
            expect(response.body).toBeDefined()
            expect(response.body.id).toBe(id)
            expect(response.body.name).toBe(athlete.name)
            expect(response.body.country).toBe(athlete.country)
            expect(response.body.birthday).toStrictEqual(new Date(athlete.birthday.year, athlete.birthday.month - 1, athlete.birthday.day).toISOString())
            expect(response.body.team).toBeDefined()
            expect(response.body.team.id).toBeUndefined()
            expect(response.body.team.name).toBeUndefined()
        })

        it("should not update athlete given an invalid id", async () => {
            const athlete = {
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023
                }
            }

            const createAthleteResponse = await request(app)
                .post(PATH)
                .send(athlete)

            const { id } = createAthleteResponse.body

            expect(createAthleteResponse.status).toBe(200)
            expect(id).toBeDefined()

            const body = {
                ...athlete,
                teamId: "123"
            }

            const path = `${PATH}/invalid-id`

            const response = await request(app)
                .put(path)
                .send(body)

                expect(response.status).toBe(404)
                expect(response.body).toBeDefined()
                expect(response.body.error).toBe('Error while updating athlete: Athlete ID "invalid-id" not found')
        })
    })
})