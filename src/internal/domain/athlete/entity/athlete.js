export class Athlete {
    #id
    #name
    #country
    #birthday
    #team

    constructor({id, name, country, birthday}) {
        this.#id = id
        this.#name = name
        this.#country = country
        this.#birthday = birthday
    }

    changeTeam(team) {
        this.#team = team
    }

    get id() {
        return this.#id
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