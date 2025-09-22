const express = require("express");
const authorsTable =  require('../Models/author.model.js')
const db = require('../db/index.js')

const router = express.Router();

router.get("/", async(req, res) => {
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
});

router.get("/:id", async(req, res) => {
    const authors = await db.select().from(authorsTable).where();
    return res.json(authors);
});

module.exports = router;