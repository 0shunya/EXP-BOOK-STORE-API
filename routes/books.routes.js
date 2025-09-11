const express = require("express");

const controller = require('../Controllers/book.controller')


const router = express.Router();

router.get('/', controller.getAllBooks)
router.post('/', controller.postBook)

router.get('/:id', controller.getAllBooksbyID);

router.delete('/:id', controller.deleteBookbyID);


module.exports = router;