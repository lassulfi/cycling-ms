import { AthleteID } from "../../../domain/athlete/entity/athlete.id"

export default class AthleteController {
    #createAthleteUseCase
    #getAthleteUseCase
    #updateAthleteUseCase

    constructor({ createAthleteUseCase, getAthleteUseCase, updateAthleteUseCase }) {
        this.#createAthleteUseCase = createAthleteUseCase
        this.#getAthleteUseCase = getAthleteUseCase
        this.#updateAthleteUseCase = updateAthleteUseCase
    }

    async create(request, response) {
        const input = request.body

        const output = await this.#createAthleteUseCase.execute(input)

        return response.json(output)
    }

    async getById(request, response) {
        try {
            const { id } = request.params

            const output = await this.#getAthleteUseCase.execute({ id: AthleteID.from(id) })

            return response.json(output)
        } catch (err) {
            return response.status(404).json({
                error: err.message
            })
        }
    }

    async update(request, response) {
        try {
            const { id } = request.params
            const body = request.body
    
            const input = {
                id,
                ...body
            }
    
            const output = await this.#updateAthleteUseCase.execute(input)
    
            return response.json(output)
        } catch (err) {
            return response.status(404).json({
                error: err.message
            })
        }
    }
}