const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  console.log('routes/api/index.js Wrong route!')
  res.send('Wrong route!')
});

module.exports = router;
