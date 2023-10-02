const table_name = "users";

exports.up = function(knex) {
    return knex.schema.createTable(table_name, function (table) {
        table.increments('id').primary();
        table.string('first_name', 100);
        table.string('last_name', 100);
        table.string('username', 100).unique();
        table.string('email', 100).unique().notNullable();
        table.string('password', 100);
        table.bigInteger('created_at');
        table.bigInteger('updated_at');
    });
};

exports.down = function(knex) {
    return knex.dropTableIfExists(table_name);
};
