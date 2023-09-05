export class TeamRepository {
    #teamDB

    constructor() {
        this.#teamDB = []
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