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
        return this.#athletes.push(athlete)
    }

    removeAthlete(athlete) {
        return this.#athletes.filter(a => a.id.getValue() !== athlete.id.getValue())
    }

    get name() {
        return this.#name
    }

    get athletes() {
        return this.#athletes
    }
}