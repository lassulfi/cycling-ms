import { Entity } from "../../@shared/entity/entity.js";
import { v4 as uuid }  from "uuid"

export class TeamID extends Entity {

    constructor(value) {
        super(value)
    }

    static unique() {
        return this.from(uuid())
    }

    static from(anId) {
        return new TeamID(anId)
    }
}