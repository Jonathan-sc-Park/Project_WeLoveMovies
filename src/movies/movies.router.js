const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// (LIST) GET /movie
router
  .route("/")
  .get(controller.list)
  .all(methodNotAllowed);
//------------------------------------------------------------------//
// (READ) GET /movie/:movieId
router
  .route("/:movieId")
  .get(controller.read)
  .all(methodNotAllowed);
//------------------------------------------------------------------//
// (READ) GET /movies/:movieId/theaters
router
  .route("/:movieId/theaters")
  .get(controller.readTheaters)
  .all(methodNotAllowed);
//------------------------------------------------------------------//
// (READ) GET /movies/:movieId/reviews
router
  .route("/:movieId/reviews")
  .get(controller.readReviews)
  .all(methodNotAllowed);
//------------------------------------------------------------------//
module.exports = router;







