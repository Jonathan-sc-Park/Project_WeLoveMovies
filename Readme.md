Middleware packages.
Receive requests through routes.
Access relevant information through route and query parameters.(CORS)
Errorhandler.
Build API(RESTful design principle)
Connection to your database with Knex.
Database queries for CRUD routes in an Express server.
Join & Nested data with Knex.
Migration using Knex's migration tools.
Deploy your backend server to a cloud service.

Database: SQLite => updating a record, need to query the database again to return updated record.

Instruction(Inside-Out development)
  Database tables(migration)
  - Create five tables(critics, movies-theaters, movies, reviews, theaters)
  - Create & run each of migrations
  Routes
  - Create routes(movies, reviews, theaters, errors) + router/controller/service.js
  - Some routes return data dependent on query parameters.
    - movies
      - LIST(GET)
        - GET /movies
        - GET /movies?is_showing=true
      - READ(GET)
        - GET /movies/:movieId
        - GET /movies/:movieId (incorrect ID) - "404"
        - GET /movies/:movieId/theaters
        - GET /movies/:movieId/reviews
    - reviews
      - DESTROY(DELETE)
        - DELETE /reviews/:reviewId - "204 No Content"
        - DELETE /reviews/:reviewId (incorrect ID) - "404" + { "error": "Review cannot be found." }
      - UPDATE(PUT)
        - PUT /reviews/:reviewId
        - PUT /reviews/:reviewId (incorrect ID) - "404" + { "error": "Review cannot be found." }
    - theaters
      - LIST(GET)
        - GET /theaters
          - "./src/utils"
            - mapProperties() ≈ .map() method of an array.
            - reduceProperties()
    - errors
      - asyncErrorBoundary(35.7)
      - errorHandler
      - methodNotAllowed
      - notFound




General Tasks
- Use 'CORS' package => requests from the frontend can correctly reach the backend.
- All of the routes should respond with tha appropriate status code, should use a data key in the response.
- Return Error
  - '404': route that does not exist.(READ)
  - '405': route that exists, but HTTP method is wrong.


# Project_WeLoveMovies
