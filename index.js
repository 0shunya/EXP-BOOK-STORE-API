const express = require("express")

const app = express()

const PORT = 8000;

const book = [
    {id:1, title: 'How to be Hero', author: 'Author One'},
    {id:2, title: 'How to be Villian', author: 'Author Two'}
]

app.use(express.json())

app.get('/books', (req, res) => {
    res.json(book);
})
app.post('/books', (req, res) => {

    const {title, author} = req.body;

    if(!title || title == '') return res.status(400).json('The title is required')
    if(!author || author == '') return res.status(400).json('The author is required')
    
    const id = book.length + 1;
    const books = {id, title, author}
    
    book.push(books)

    return res.status(201).json({message: `Book created successfully`, id})
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id
    const books = book.find((e) => e.id == id);

    if(isNaN(id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!books)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})
    
    return res.json(books)
});

app.delete('/books/:id', (req, res) => {
    const id = req.params.id
    const indexToDelete = book.findIndex((e) => e.id == id);

    if(isNaN    (id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!indexToDelete)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})

    book.splice(indexToDelete, 1);
    
    return res.status(200).json({message: `book deleted!`});
});

app.listen(PORT, () => console.log(`HTTP Server error is running on ${PORT}`))