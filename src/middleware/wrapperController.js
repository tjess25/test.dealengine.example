
const wrapperController = (controllerFn) => {
  return async (req, res, next) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = wrapperController;


