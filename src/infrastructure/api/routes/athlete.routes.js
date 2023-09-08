import express from "express"

import { AthleteRepository } from "../../repository/local/athlete/athlete.repository.js"
import { CreateAthleteUseCase } from "../../../internal/usecase/athlete/create/create.athlete.usecase.js"
import { GetAthleteUseCase } from "../../../internal/usecase/athlete/retrieve/get/get.athlete.usecase.js"
import { UpdateAthleteUseCase } from "../../../internal/usecase/athlete/update/update.athlete.usecase.js"
import AthleteController from "../../../internal/ports/http/athlete/athlete.controller.js"

const athleteRepository = new AthleteRepository()

const createAthleteUseCase = new CreateAthleteUseCase({ athleteRepository })
const getAthleteUseCase = new GetAthleteUseCase({ athleteRepository })
const updateAthleteUseCase = new UpdateAthleteUseCase({ athleteRepository })

const athleteController = new AthleteController({
    createAthleteUseCase,
    getAthleteUseCase,
    updateAthleteUseCase
})

const athleteRouter = express.Router()

athleteRouter.post("/", async (req, res) => {
    await athleteController.create(req, res)
})
athleteRouter.get("/:id", async (req, res) => { await athleteController.getById(req, res) })
athleteRouter.put("/:id", async (req, res) => { await athleteController.update(req, res) })

export default athleteRouter;
