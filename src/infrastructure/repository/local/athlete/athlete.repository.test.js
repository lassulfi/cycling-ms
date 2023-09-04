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
                id: athlete.id,
                name: "Updated Athlete 1",
                country: "Updated Country 1",
                birthday: {
                    day: 2,
                    month: 2,
                    year: 2022,
                },
            })

            const updatedAthlete = await repository.update(athleteToUpdate);

            expect(updatedAthlete).toStrictEqual(athleteToUpdate)
            await expect(repository.count()).resolves.toBe(1)
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