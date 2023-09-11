export class GetAthleteUseCase {
    #athleteRepository

    constructor({ athleteRepository }) {
        this.#athleteRepository = athleteRepository
    }

    async execute({ id: anId }) {
        let output

        try {
            const athlete = await this.#athleteRepository.findOne({ id:anId })

            const {id, name, country, birthday: { date } } = athlete

            output = {
                id: id.getValue(),
                name,
                country,
                birthday: date
            }
        } catch (error) {
            throw new Error(`Error retrieving athlete with ID "${anId.getValue()}": ${error.message}`)
        }

        return output
    }
}