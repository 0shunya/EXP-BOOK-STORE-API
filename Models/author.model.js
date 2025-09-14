const {pgTable, uuid, varchar} =  require('drizzle-orm/pg-core');

const authorsTable = pgTable('authors', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({length: 225}).notNull(),
    lastName: varchar({length: 225}),
    email: varchar({length: 225}).notNull().unique(),
});

module.exports = authorsTable;