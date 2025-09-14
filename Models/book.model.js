const {pgTable, uuid, varchar, text} =  require('drizzle-orm/pg-core');
const authorsTable = require('./author.model');

const bookTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 225}).notNull(),
    description: text(),
    authorid: uuid().references(() => authorsTable.id).notNull(),
});

module.exports = bookTable;