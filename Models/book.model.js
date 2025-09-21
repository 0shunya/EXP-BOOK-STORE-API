const { pgTable, uuid, varchar, text, index } = require('drizzle-orm/pg-core');
const { sql } = require('drizzle-orm');
const authorsTable = require('./author.model');

const bookTable = pgTable('books', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 225 }).notNull(),
  description: text(),
  authorid: uuid().references(() => authorsTable.id).notNull(),
}, (table) => ({
  searchIndexOnTitle: index("title_index").using(
    "gin",
    sql`to_tsvector('english', ${table.title})`
  )
}));

module.exports = bookTable;
