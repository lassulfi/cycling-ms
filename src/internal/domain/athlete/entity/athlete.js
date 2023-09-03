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

    changeName(name) {
        this.#name = name

        return this
    }

    changeCountry(country) {
        this.#country = country

        return this
    }

    changeTeam(team) {
        this.#team = team
        
        return this;
    }

    changeBirthday(birthday) {
        this.#birthday = birthday

        return this
    }

    removeTeam(team) {
        if (this.#team.id.getValue() !== team.id.getValue()) {
            throw new Error("Invalid team")
        }
        
        this.#team = null

        return this
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