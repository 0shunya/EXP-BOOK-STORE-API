const {pgTable, uuid, varchar, text} =  require('drizzle-orm/pg-core');
const authorsTable = require('./author.model');
const { sql } = require('drizzle-orm');
const { table } = require('console');

const bookTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 225}).notNull(),
    description: text(),
    authorid: uuid().references(() => authorsTable.id).notNull(),
}, () => ({
    searchIndexOnTitle: index("title_index").using(
        "gin",
        sql`to_tsvector('english', ${table.title})`
    )
}));

module.exports = bookTable;