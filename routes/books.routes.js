const express = require("express");
const {BOOK} = require('../db/books')

const router = express.Router();

router.get('/', (req, res) => {
    res.json(BOOK);
})
router.post('/', (req, res) => {

    const {title, author} = req.body;

    if(!title || title == '') return res.status(400).json('The title is required')
    if(!author || author == '') return res.status(400).json('The author is required')
    
    const id = BOOK.length + 1;
    const books = {id, title, author}
    
    BOOK.push(books)

    return res.status(201).json({message: `Book created successfully`, id})
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    const books = BOOK.find((e) => e.id == id);

    if(isNaN(id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!books)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})
    
    return res.json(books)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const indexToDelete = BOOK.findIndex((e) => e.id == id);

    if(isNaN    (id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!indexToDelete)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})

    BOOK.splice(indexToDelete, 1);
    
    return res.status(200).json({message: `book deleted!`});
});


module.exports = router;