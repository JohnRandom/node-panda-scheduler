const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.json([
    {
      id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
      name: 'Bertha Smith'
    }
  ]);
});

router.get('/:id', (req, res) => {
  res.json({
    id: 'ae535d61-26b0-4e26-8574-1d0e4e75bbc1',
    name: 'Bertha Smith'
  });
});

module.exports = router;
