export default class TeamController {
    #createTeamUseCase

    constructor({ createTeamUseCase }) {
        this.#createTeamUseCase = createTeamUseCase
    }

    async create(request, response) {
        const input = request.body

        const output = await this.#createTeamUseCase.execute(input)

        return response.json(output)
    }
}