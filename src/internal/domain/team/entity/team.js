import { TeamID } from "./team.id.js"

export class Team extends TeamID {
    #name
    #athletes

    constructor({id, name}) {
        super(id)
        this.#name = name
        this.#athletes = []
    }

    addAthlete(athlete) {
        this.#athletes.push(athlete)

        return this
    }

    removeAthlete(athlete) {
        this.#athletes = this.#athletes.filter(a => a.id.getValue() !== athlete.id.getValue())
        return this
    }

    get name() {
        return this.#name
    }

    get athletes() {
        return this.#athletes
    }
}