export class TeamRepository {
    #teamDB

    constructor() {
        if (TeamRepository.instance) {
            return TeamRepository.instance
        }

        this.#teamDB = []
        TeamRepository.instance = this;
    }

    static getInstance() {
        if(!TeamRepository.instance) {
            TeamRepository.instance = new TeamRepository()
        }

        return TeamRepository.instance;
    }

    create(team) {
        return new Promise((resolve, reject) => {
            try {
                this.#teamDB.push(team)

                resolve(team)
            } catch (error) {
                reject(error)
            }
        })
    }

    findOne({id}) {
        return new Promise((resolve, reject) => {
            try {
                const team = this.#teamDB.find(t => t.id.getValue() === id.getValue())

                resolve(team)
            } catch (error) {
                reject(error)
            }
        })
    }

    count() {
        return new Promise((resolve, reject) => {
            try {
                const count = this.#teamDB.length

                resolve(count)
            } catch (error) {
                reject(error)
            }
        })
    }
}