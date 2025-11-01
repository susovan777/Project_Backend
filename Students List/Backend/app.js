import express from "express";

const app = express();

app.use(express.json())

const htmlCode = "<h1>This is from server!</h1><h3>This is line</h3>"

app.get("/", (req, res) => {
    // res.status(200).send("Hello, from server!")
    res.status(200).send(htmlCode)
})

export { app };
