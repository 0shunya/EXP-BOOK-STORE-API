// const {BOOK} = require('../Models/books')
const bookTable = require('../Models/book.model.js')

exports.getAllBooks = function(req, res) {
    res.json(bookTable);
}
exports.getAllBooksbyID = function(req, res) {
    const id = req.params.id
    const books = bookTable.find((e) => e.id == id);

    if(isNaN(id)) {
        res.status(400).json({eror:`This is not an id`})
    }

    if(!books)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})
    
    return res.json(books)
}
exports.postBook = function(req, res) {

    const {title, author} = req.body;

    if(!title || title == '') return res.status(400).json('The title is required')
    if(!author || author == '') return res.status(400).json('The author is required')
    
    // const id = BOOK.length + 1;
    const id = bookTable.length > 0 ? Math.max(...bookTable.map(b => b.id)) + 1 : 1;
    const books = {id, title, author}
    
    bookTable.push(books)

    return res.status(201).json({message: `Book created successfully`, id})
}
exports.deleteBookbyID = function (req, res) {
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
}

