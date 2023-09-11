export class AthleteRepository {
    #athleteDB

    constructor() {
        this.#athleteDB = []
    }

    create(athlete) {
        return new Promise((resolve, reject) => {
            try {
                this.#athleteDB.push(athlete)

                resolve(athlete)
            } catch (error) {
                reject(error)
            }
        })
    }

    findOne({ id }) {
        return new Promise((resolve, reject) => {
            try {
                const entity = this.#athleteDB.find(a => a.id.getValue() === id.getValue())
                if (!entity) throw new Error(`Athlete ID "${id.getValue()}" not found`)

                resolve(entity)
            } catch (error) {
                reject(error)
            }
        })
    }

    update(athlete) {
        return new Promise((resolve, reject) => {
            this.findOne({ id: athlete.id })
                .then(entity => {
                    entity.changeName(athlete.name)
                        .changeCountry(athlete.country)
                        .changeBirthday(athlete.birthday)
                        .changeTeam(athlete.team)

                    const index = this.#athleteDB.indexOf(entity)
                    this.#athleteDB[index] = entity

                    resolve(entity)
                }).catch(error => {
                    reject(error)
                })
        })
    }

    count() {
        return new Promise((resolve, reject) => {
            try {
                const count = this.#athleteDB.length

                resolve(count)
            } catch (error) {
                reject(error)
            }
        })
    }

    findAll() {
        return new Promise((resolve, reject) => {
            try {
                resolve(this.#athleteDB)
            } catch (error) {
                reject(error)
            }
        })
    }
}