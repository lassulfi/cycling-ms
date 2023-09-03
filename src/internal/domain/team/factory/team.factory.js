import { TeamID } from "../entity/team.id.js";
import { Team } from "../entity/team.js";

export class TeamFactory {
    static newTeam(name) {
        return new Team({id: TeamID.unique(), name})
    }
}