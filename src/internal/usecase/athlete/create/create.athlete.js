import { AthleteFactory } from "../../../domain/athlete/factory/athlete.factory.js"

export class CreateAthleteUseCase {
    #athleteRepository

    constructor({ athleteRepository }) {
        this.#athleteRepository = athleteRepository
    }

    async execute({name, country, birthday}) {
        let output
        
        try {
            const athlete = AthleteFactory.newAthlete({name, country, birthday})
            
            await this.#athleteRepository.create(athlete)

            output = { id: athlete.id.getValue() }
        } catch (error) {
            throw error
        }
        
        return output
    }
}