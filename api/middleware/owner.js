export default function (Model, errorMessage) {
    return async function (req, res, next) {
      try {
        const model = await Model.findById(req.params.id);
        if (!model) return res.status(404).send(errorMessage);
  
        if (model.user.toString() === req.user._id) {
          return next();
        }
         res.status(403).send('Access denied. You are not authorized to perform this action.');
      } catch (err) {
        console.error('Error in adminOrOwner middleware:', err);
         res.status(500).send('Server error');
      }
    };
  };
  