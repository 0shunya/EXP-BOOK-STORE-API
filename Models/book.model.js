const {pgTable, uuid, varchar, text} =  require('drizzle-orm/pg-core');
const { title } = require('process');

const bookTable = pgTable('books', {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 225}).notNull(),
    description: text(),
});