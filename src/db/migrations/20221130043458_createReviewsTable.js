
exports.up = function(knex) {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content");
    table.integer("score");
    // (Foreign key)movie_id
      // .unsigned(): prevent negative values from being inserted in to "movie_id"
    table.integer("movie_id").unsigned().notNullable();
    table
      .foreign("movie_id")
      .references("movie_id")
      .inTable("movies")
      .onDelete("cascade")
    // (Foreign key)critic_id
    table.integer("critic_id").unsigned().notNullable();
    table
      .foreign("critic_id")
      .references("critic_id")
      .inTable("critics")
      .onDelete("cascade")
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("reviews");
};
