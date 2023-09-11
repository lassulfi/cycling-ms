import express from "express"

import { TeamRepository } from "../../../infrastructure/repository/local/team/team.repository.js"
import { CreateTeamUseCase } from "../../../internal/usecase/team/create/create.team.usecase.js"
import TeamController from "../../../internal/ports/http/team/team.controller.js"
import { AthleteRepository } from "../../repository/local/athlete/athlete.repository.js"

const teamRepository = new TeamRepository()
const athleteRepository = new AthleteRepository()

const createTeamUseCase = new CreateTeamUseCase({ teamRepository, athleteRepository })
const teamController = new TeamController({ createTeamUseCase })

const teamRouter = express.Router()

teamRouter.post("/", async (req, res) => { await teamController.create(req, res) })

export default teamRouter

