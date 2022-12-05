const service = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//------------------------------------------------------------------//
// LIST(theaters)
async function list(req, res, _next) {
  const listTheater = await service.list();
  res.json({ data: listTheater });
}

module.exports = {
  list: asyncErrorBoundary(list),
}