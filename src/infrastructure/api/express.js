import express from "express";
import { athleteRouter } from "./routes/athlete.routes.js";
import { teamRouter } from "./routes/team.routes.js";

export const app = express()

app.use(express.json())
app.use("/athletes", athleteRouter)
app.use("/teams", teamRouter)
