const express = require("express")
require('dotenv/config')
const app = express()
const PORT = 8000;
const bookRouter = require("./routes/books.routes")
const {loggerMiddleware} = require("./middlewares/logger")



app.use(express.json());
app.use(loggerMiddleware)
app.use('/books', bookRouter);



app.listen(PORT, () => console.log(`HTTP Server error is running on ${PORT}`))