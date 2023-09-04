import { TeamFactory } from "../../../domain/team/factory/team.factory.js"

export class CreateTeamUseCase {
    #teamRepository
    #athleteRepository

    constructor({ teamRepository, athleteRepository }) {
        this.#teamRepository = teamRepository
        this.#athleteRepository = athleteRepository
    }   

    async execute({ name, athletesId }) {
        let output
        try {
            const team = TeamFactory.newTeam(name)
    
            if (athletesId.length) {
                const athletes = await Promise.all(athletesId.map(id => this.#athleteRepository.findOne({id})))
                
                for (const athlete of athletes) {
                    try {
                        athlete.changeTeam(team)
                        
                        await this.#athleteRepository.update(athlete)
                        
                        team.addAthlete(athlete)
                    } catch (error) {
                        throw error
                    }
                }
            }
            
            await this.#teamRepository.create(team)

            output = {
                id: team.id.getValue()
            }
        } catch (error) {
            throw new Error(`Error while creating team: ${error.message}`)
        }

        return output
    }
}