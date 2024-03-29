// Models
const { Restaurant } = require('../models/restaurant.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const restaurantExists = catchAsync(async (req, res, next) => {
  const { restaurantId } = req.params;
  const restaurant = await Restaurant.findOne({
    where: { id: restaurantId, status: 'active' },
  });
  if (!restaurant) {
    return next(new AppError('Restaurant does not exist with given Id', 404));
  }
  // Add restaurant data to the req object
  req.restaurant = restaurant;
  next();
});


module.exports = {
  restaurantExists,
};
