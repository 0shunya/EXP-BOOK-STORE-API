// const {BOOK} = require('../Models/books')
const bookTable = require('../Models/book.model.js')
const db = require('../db/index.js')
const { eq } = require('drizzle-orm')

exports.getAllBooks = async function(req, res) {
    const books = await db.select().from(bookTable)
    res.json(books);
}
exports.getAllBooksbyID = async function(req, res) {
    const id = req.params.id

    const [book] = await db.select().from(bookTable).where(table => eq(table.id, id)).limit(1);

    if(!book)
        return res
                .status(404)
                .json({error:`Book with id ${id} does not exist`})
    
    return res.json(book)
}
exports.postBook = async function(req, res) {

    const {title, description, authorId} = req.body;

    if(!title || title == '') return res.status(400).json('The title is required')

    // const id = BOOK.length + 1;

    const result = await db.insert(bookTable).values({
        title,
        description,
        authorId
    }).returning({
        id: bookTable.id
    })

    return res.status(201).json({message: `Book created successfully`, id: result.id})
}
exports.deleteBookbyID = async function (req, res) {
    const id = req.params.id

    await db.delete(bookTable).where(table => eq(table.id, id))
    
    return res.status(200).json({message: `Book id:${id} deleted`});
}

