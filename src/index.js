import express from "express";
import * as path from "node:path";

const app = express()
app.use(express.static(path.join(import.meta.dirname, "static")))

const listener = app.listen(3000, () => {
    const { port } = listener.address()
    console.log(`Listening on http://localhost:${port}/`)
})