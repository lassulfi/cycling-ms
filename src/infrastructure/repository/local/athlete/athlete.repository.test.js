import { describe, it, expect } from "@jest/globals";
import { AthleteRepository } from "./athlete.repository.js";
import { AthleteFactory } from "../../../../internal/domain/athlete/factory/athlete.factory.js";
import { AthleteID } from "../../../../internal/domain/athlete/entity/athlete.id.js";
import { Athlete } from "../../../../internal/domain/athlete/entity/athlete.js";
import { TeamID } from "../../../../internal/domain/team/entity/team.id.js";

describe("# Athlete repository unit tests", () => {
    describe("# create method unit tests", () => {
        it("should create an athlete", async () => {
            const repository = new AthleteRepository()

            const athlete = AthleteFactory.newAthlete({
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023,
                },
            })

            const result = await repository.create(athlete)

            expect(result).toStrictEqual(athlete)
            await expect(repository.count()).resolves.toBe(1)
        })
    })

    describe("# findOne method unit tests", () => {
        it("should return an athlete", async () => {
            const repository = new AthleteRepository()

            const athlete = AthleteFactory.newAthlete({
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023,
                },
            })

            await repository.create(athlete)

            await expect(repository.count()).resolves.toBe(1)

            const result = await repository.findOne({ id: athlete.id })
            expect(result).toStrictEqual(athlete)
        })
    })

    it("should not return an athlete given an invalid id", async () => {
        const repository = new AthleteRepository()

        const athlete = AthleteFactory.newAthlete({
            name: "Athlete 1",
            country: "Country 1",
            birthday: {
                day: 1,
                month: 1,
                year: 2023,
            },
        })

        await repository.create(athlete)

        await expect(repository.count()).resolves.toBe(1)

        await expect(repository.findOne({ id: AthleteID.from("123") })).rejects.toThrow('Athlete ID "123" not found')
    })

    describe("# update method unit tests", () => {
        it("should update an athlete", async () => {
            const repository = new AthleteRepository()

            const athletes = [
                AthleteFactory.newAthlete({
                    name: "Athlete 1",
                    country: "Country 1",
                    birthday: {
                        day: 1,
                        month: 1,
                        year: 2021,
                    },
                }),
                AthleteFactory.newAthlete({
                    name: "Athlete 2",
                    country: "Country 2",
                    birthday: {
                        day: 2,
                        month: 2,
                        year: 2022,
                    },
                }),
                AthleteFactory.newAthlete({
                    name: "Athlete 3",
                    country: "Country 3",
                    birthday: {
                        day: 3,
                        month: 3,
                        year: 2023,
                    },
                })
            ]

            for(const athlete of athletes) {
                await repository.create(athlete)
            }

            await expect(repository.count()).resolves.toBe(3)

            let athleteToUpdate = new Athlete({
                id: athletes[0].id,
                name: "Updated Athlete 1",
                country: "Updated Country 1",
                birthday: {
                    day: 4,
                    month: 4,
                    year: 2024,
                },
            })

            let updatedAthlete = await repository.update(athleteToUpdate);

            let updatedAthletes = await repository.findAll()

            expect(updatedAthlete).toStrictEqual(updatedAthletes[0])
            await expect(repository.count()).resolves.toBe(3)

            athleteToUpdate = new Athlete({
                id: athletes[1].id,
                name: "Updated Athlete 2",
                country: "Updated Country 2",
                birthday: {
                    day: 4,
                    month: 4,
                    year: 2024,
                },
            })

            updatedAthlete = await repository.update(athleteToUpdate);

            updatedAthletes = await repository.findAll()

            expect(updatedAthlete).toStrictEqual(updatedAthletes[1])
            await expect(repository.count()).resolves.toBe(3)

            athleteToUpdate = new Athlete({
                id: athletes[2].id,
                name: "Updated Athlete 3",
                country: "Updated Country 3",
                birthday: {
                    day: 4,
                    month: 4,
                    year: 2024,
                },
            })

            updatedAthlete = await repository.update(athleteToUpdate);

            updatedAthletes = await repository.findAll()

            expect(updatedAthlete).toStrictEqual(updatedAthletes[2])
            await expect(repository.count()).resolves.toBe(3)
        })

        it("should not update an athlete given an invalid id", async () => {
            const repository = new AthleteRepository()

            const athlete = AthleteFactory.newAthlete({
                name: "Athlete 1",
                country: "Country 1",
                birthday: {
                    day: 1,
                    month: 1,
                    year: 2023,
                },
            })

            await repository.create(athlete)

            await expect(repository.count()).resolves.toBe(1)

            const athleteToUpdate = new Athlete({
                id: TeamID.from("123"),
                name: "Updated Athlete 1",
                country: "Updated Country 1",
                birthday: {
                    day: 2,
                    month: 2,
                    year: 2022,
                },
            })

            await expect(repository.update(athleteToUpdate)).rejects.toThrow('Athlete ID "123" not found')
            await expect(repository.count()).resolves.toBe(1)
        })
    })
})