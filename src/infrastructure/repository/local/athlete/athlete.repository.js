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

    findOne({id}) {
        return new Promise((resolve, reject) => {
            try {
                const athletesById = this.#listAthletesById(id)

                resolve(athletesById[0])
            } catch (error) {
                reject(error)
            }
        })
    }

    #listAthletesById(id) {
        console.log(id.getValue())

        const athletesById = this.#athleteDB.filter(a => a.id.getValue() === id.getValue())

        if (!athletesById.length) throw new Error(`Athlete ID "${id.getValue()}" not found`)
        return athletesById
    }

    update(athlete) {
        return new Promise((resolve, reject) => {
            try {
                const athletesById = this.#listAthletesById(athlete.id)

                const entity = athletesById[0];
                entity.changeName(athlete.name)
                            .changeCountry(athlete.country)
                            .changeBirthday(athlete.changeBirthday)
                            .changeTeam(athlete.team)

                const index = this.#athleteDB.indexOf(entity)
                this.#athleteDB[index] = entity

                resolve(entity)
            } catch (error) {
                reject(error)
            }
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