const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
//------------------------------------------------------------------//
// selects all columns from the 'movies' table.
function list() {
  return knex("movies").select("*");
}

function listMoviesCurrentlyShowing() {
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .select('*')
    .where({ is_showing: true })
    .groupBy('m.movie_id')
  }
//------------------------------------------------------------------//
function read(movieId) {
  return knex('movies')
    .select('*')
    .where({ movie_id: movieId })
    .then((returnMovie) => returnMovie[0]);
}
//------------------------------------------------------------------//
// Use for listTheatersPlayingMovies("./movies.router")
  // find theater where the movie is playing.
function getTheater(movieId) {
  return knex('movies_theaters as mt')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('*')
    .where({ movie_id: movieId, is_showing: true });
}
//------------------------------------------------------------------//
// critic details
  // critic_id, preferred_name, surname, organization_name, (migration fil)create_at, updated_at
const criticDetails = mapProperties({
  critic_id: 'critic.critic_id',
  preferred_name: 'critic.preferred_name',
  surname: 'critic.surname',
  organization_name: 'critic.organization_name',
});

function getReviews(movieId) {
  return knex("movies as m")
    .join('reviews as r', 'm.movie_id', 'r.movie_id')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select('*')
    .where({ 'r.movie_id': movieId })
    .then((reviews) => {
      const getCritics = [];
      reviews.forEach((review) => {
        const critic = criticDetails(review);
        getCritics.push(critic);
      });
      return getCritics;
    })
}

//------------------------------------------------------------------//
module.exports = {
  list,
  listMoviesCurrentlyShowing,
  read,
  getTheater,
  getReviews,
};