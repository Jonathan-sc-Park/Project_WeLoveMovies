const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//------------------------------------------------------------------//
// Define res.locals.review = review;
// UPDATE /reviews/:reviewId (incorrect ID)
// DELETE /reviews/:reviewId (incorrect ID)
  // 404 + "Review cannot be found."

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404, 
        message: "Review cannot be found."
    })
}
//------------------------------------------------------------------//
// (UPDATE) PUT /reviews/:reviewId
  // The response should include the entire review record with the newly patched content.
  // Critic information set to the critic property.
async function update (req, res, _next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };

  await service.update(updatedReview);
  updatedReview.critic = await service.propertyCritic(updatedReview.critic_id)
  res.json({ data: updatedReview});
}
//------------------------------------------------------------------//
//(DELETE) DELETE /reviews/:reviewId
  // 204 No Content
// DELETE /reviews/:reviewId (incorrect ID) => reviewExists
  // 404
async function destroy (_req, res, _next) {
  await service.delete(
    res.locals.review.review_id
  );
  res.sendStatus(204);
}
//------------------------------------------------------------------//
module.exports = {
  update: [asyncErrorBoundary(reviewExists), update],
  delete: [asyncErrorBoundary(reviewExists), destroy]
}