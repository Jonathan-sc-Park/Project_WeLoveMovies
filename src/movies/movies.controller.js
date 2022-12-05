const service = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
//------------------------------------------------------------------//
// LIST(movies)
async function list(req, res, _next) {
  const { is_showing } = req.query;
  let listMovie;
  
  if(is_showing === "true") {
    listMovie = await service.listMoviesCurrentlyShowing()
  } else {
    listMovie = await service.list()
  }
    res.json({ data: listMovie })
}
//------------------------------------------------------------------//
// INCORRECT ID(404) - movieIdExists
  // status: 404, message: "error": "Movie cannot be found."
  // res.locals.movie  - specific movie(req.params) of /:movieId
async function movieIdExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  if(foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  return next({ status: 404, message: "Movie cannot be found."})
}
//------------------------------------------------------------------//
// READ(movies)
async function read(_req, res, _next) {
  res.json({ data: res.locals.movie })
}
//------------------------------------------------------------------//
// READ(movies-theaters)
  // Should return only those movies where the movie is currently showing in theaters.
    // => movies_theaters
async function readTheaters(req, res, _next) {
  let moviesTheaters = await service.getTheater(res.locals.movie.movie_id)
  res.json({ data: moviesTheaters })
}
//------------------------------------------------------------------//
// READ(movies-reviews)
  // Should return all the reviews for the movie
  // including all the critic details
    // critic_id, preferred_name, surname, organization_name, create_at, updated_at
async function readReviews(req, res, _next) {
  let moviesReviews = await service.getReviews(res.locals.movie.movie_id)
  res.json({ data: moviesReviews })
}
//------------------------------------------------------------------//
module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieIdExists), read],
  readTheaters: [
    asyncErrorBoundary(movieIdExists),
    readTheaters,
  ],
  readReviews: [
    asyncErrorBoundary(movieIdExists),
    readReviews,
  ],
}