import { Identifier } from "./identifier.js"

export class Entity extends Identifier {
    #id
    constructor(id) {
        super()
        this.#id = id
    }

    get id() {
        return this.#id
    }

    getValue() {
        return this.#id
    }
}