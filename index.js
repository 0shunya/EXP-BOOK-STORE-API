const express = require("express")
const app = express()
const PORT = 8000;
const bookRouter = require("./routes/books.routes")
const fs = require("node:fs")

// function loggerMiddleware(req, res, next) {
//     const log = `\n[${Date.noe()}] ${req.method}`
// }

app.use(express.json());
app.use('/books', bookRouter);


app.listen(PORT, () => console.log(`HTTP Server error is running on ${PORT}`))