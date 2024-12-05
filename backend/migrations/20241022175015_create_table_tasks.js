/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("tasks", table => {
        table.increments("id").primary()
        table.string("desc").notNull()
        table.datetime("estimate_at")
        table.datetime("done_at")
        table.integer("user_id").references("id")
            .inTable("users").notNull()

    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("tasks")
};
