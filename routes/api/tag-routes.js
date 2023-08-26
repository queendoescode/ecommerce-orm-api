const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const data = await Tag.findAll({include: Product});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in fetching data"});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagId = req.params.id;

  try {
    const data = await Tag.findByPk(tagId, {include: Product});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in fetching data"});
  }
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
