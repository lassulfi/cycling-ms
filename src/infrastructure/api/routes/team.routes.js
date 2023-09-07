import express from "express"

import { TeamRepository } from "../../../infrastructure/repository/local/team/team.repository.js"
import { CreateTeamUseCase } from "../../../internal/usecase/team/create/create.team.usecase.js"
import TeamController from "../../../internal/ports/http/team/team.controller.js"

const teamRepository = new TeamRepository()
const createTeamUseCase = new CreateTeamUseCase({ teamRepository })
const teamController = new TeamController({ createTeamUseCase })

export const teamRouter = express.Router()

teamRouter.post("/", teamController.create)

