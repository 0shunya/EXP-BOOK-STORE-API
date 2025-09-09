const express = require("express")

const app = express()

const PORT = 8000;

const book = [
    {id:1, title: 'How to be Hero', author: 'Author One'},
    {id:2, title: 'How to be Villian', author: 'Author Two'}
]

app.get('/books', (req, res) => {
    res.json(book);
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const books = book.find((e) => e.id == id);

    if(NaN(id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!books)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})
    
    return res.json(books)
});

app.listen(PORT, () => console.log(`HTTP Server error is running on ${PORT}`))