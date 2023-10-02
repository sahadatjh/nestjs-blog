// const table_name = "users";

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("users").truncate()
      .then(function () {
        // Inserts seed entries
        return knex("users").insert([
          {id: 1, first_name: "Super", last_name: "Admin", username: 'superadmin', email: 'superadmin@gmail.com', password: 'password'},
          {id: 2, first_name: "Mr", last_name: "Admin", username: 'admin', email: 'admin@gmail.com', password: 'password'},
        ]);
      });
  };