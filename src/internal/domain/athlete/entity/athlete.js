export class Athlete {
    #name
    #country
    #birthday
    #team

    constructor({name, country, birthday}) {
        this.#name = name
        this.#country = country
        this.#birthday = birthday
    }

    changeTeam(team) {
        this.#team = team
    }

    get name() {
        return this.#name
    }

    get country() {
        return this.#country
    }

    get birthday() {
        return this.#birthday
    }

    get team() {
        return this.#team
    }
}