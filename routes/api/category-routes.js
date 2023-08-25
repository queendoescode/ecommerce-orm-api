const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const data = await Category.findAll({include: Product});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in fetching data"});
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryId = req.params.id;

  try {
    const data = await Category.findByPk(categoryId, {include: Product});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in fetching data"});
  }
});

router.post('/',  async (req, res) => {
  // create a new category
  const categoryName = req.body.category_name;

  try {
    const data = await Category.create({category_name: categoryName});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in creating new data"});
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
