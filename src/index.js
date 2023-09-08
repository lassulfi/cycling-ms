import app from "./infrastructure/api/express.js"

const PORT = process.env.PORT || 3333

if(process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {console.log(`server started on port ${PORT}`)})
}