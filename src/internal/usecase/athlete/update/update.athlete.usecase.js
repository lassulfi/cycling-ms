import { Birthday } from "../../../domain/@shared/value-objects/birthday.js"
import { AthleteID } from "../../../domain/athlete/entity/athlete.id.js"
import { TeamID } from "../../../domain/team/entity/team.id.js"

export class UpdateAthleteUseCase {
    #athleteRepository
    #teamRepository

    constructor({ athleteRepository, teamRepository }) {
        this.#athleteRepository = athleteRepository
        this.#teamRepository = teamRepository
    }

    async execute({id, name, country, birthday, teamId}) {
        let output

        try {
            const athlete = await this.#athleteRepository.findOne({id: AthleteID.from(id)})
            
            if (!athlete) {
                throw new Error(`Athlete ID "${id}" not found`)
            }

            const team = await this.#teamRepository.findOne({id: TeamID.from(teamId)})

            athlete
                .changeName(name ?? athlete.name)
                .changeCountry(country ?? athlete.country)
                .changeBirthday(Birthday.newBirthday(birthday) ?? athlete.birthday)
                .changeTeam(team ?? athlete.team)

            await this.#athleteRepository.update(athlete)

            output = {
                id: athlete.id.getValue(),
                name: athlete.name,
                country: athlete.country,
                birthday: athlete.birthday.date,
                team: {
                    id: athlete.team.id.getValue(),
                    name: athlete.team.name,
                }
            }
        } catch (error) {
            throw new Error(`Error while updating athlete: ${error.message}`)
        }

        return output
    }
}