const routes = require('express').Router();

routes.use('/', (req, res) => {
  res.status(404).send(
    {
      message: 'There is not resources'
    }
  );
});

module.exports = routes;