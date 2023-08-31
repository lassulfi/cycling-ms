import { Birthday } from "../../@shared/value-objects/birthday.js";
import { AthleteID } from "../entity/athlete.id.js";
import { Athlete } from "../entity/athlete.js";

export class AthleteFactory {

    static newAthlete({ name, country, birhtday: {day, month, year}}) {
        const id = AthleteID.unique()
        const birthday = new Birthday({day, month, year});
        return new Athlete({id, name, country, birthday });
    }
}