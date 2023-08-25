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

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryId = req.params.id;
  const categoryName = req.body.category_name;

  try {
    const data = await Category.update(
      {
        category_name: categoryName
      },
      { 
        where: {
          id: categoryId
        }
      });
    const updatedRow = await Category.findByPk(categoryId);
    res.json(updatedRow);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in updating data"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryId = req.params.id;

  try {
    await Category.destroy(
      { 
        where: {
          id: categoryId
        }
      }
    );
    res.json({});
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in deleting data"});
  }
});

module.exports = router;
