const knex = require("../db/connection");
//------------------------------------------------------------------//
// For reviewExists
function read (id) {
    return knex("reviews")
      .select("*")
      .where("review_id", id)
      .then((data) => data[0]);
}//------------------------------------------------------------------//
// (UPDATE) PUT /reviews/:reviewId
  // The response should include the entire review record with the newly patched content.
  // Critic information set to the critic property.

function propertyCritic (criticId) { 
  return knex('critics as c')
    .where({'c.critic_id': criticId})
    .then((data) => data[0]);
}
function update (updatedReview) {
    return knex("reviews")
      .select("*")
      .where({ review_id: updatedReview.review_id })
      .update(updatedReview, "*");
}
//------------------------------------------------------------------//
// DELETE /reviews/:reviewId
function destroy (reviewId) {
  return knex("reviews").where("review_id", reviewId).del();
}
//------------------------------------------------------------------//
module.exports = { 
    read,
    update,
    propertyCritic,
    delete: destroy
}