import { describe, it, expect } from "@jest/globals"

import request from "supertest"

import app from "../../../express.js"

const PATH = "/teams"

describe("# Team routes integration tests", () => {
    describe("# POST /teams", () => {
        it("should create a team", async () => {
            const body = {
                name: "Team A"
            }

            const response = await request(app)
                .post(PATH)
                .send(body)

            expect(response.status).toBe(200)
            expect(response.body.id).toStrictEqual(expect.any(String))
        })
    })
})