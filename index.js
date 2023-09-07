import { app } from "./src/infrastructure/api/express.js"

if(process.env.NODE_ENV !== "test") {
    app.listen(3333)
}