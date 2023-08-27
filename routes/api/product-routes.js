const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data

  try {
    const data = await    Product.findAll({include: [Category, Tag]});
    res.json(data);
  }
  catch (err) {
    res.status(400).json({error: "An error occurred in fetching data"});
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  const productId = req.params.id;

  try {
    const data = await  Product.findByPk(productId, {include: [Category, Tag]});
    res.json(data);
  }
  catch (err) {
    res.status(400).json({error: "An error occurred in fetching data"});
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

    try {
      const product = await Product.create(req.body);

      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        await ProductTag.bulkCreate(productTagIdArr);
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(400).json({error: "An error occurred in creating data"});
    }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data

  const productId = req.params.id;

  try {
    await Product.update(req.body, {
      where: {
        id: productId
      },
    });

    if (req.body.tagIds && req.body.tagIds.length) {
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id }
      });

      // create filtered list of new tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });

      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      await ProductTag.destroy({ where: { id: productTagsToRemove } });
      await ProductTag.bulkCreate(newProductTags);
    }

    const updatedProduct = await Product.findByPk(productId);
    res.status(200).json(updatedProduct);
  }
  catch (err) {
    res.status(400).json({error: "An error occurred in updating data"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value

  const productId = req.params.id;

  try {
    await Product.destroy(
      { 
        where: {
          id: productId
        }
      }
    );
    res.json({});
  }
  catch (err) {
    res.status(400).json({error: "An error occurred in deleting data"});
  }
});

module.exports = router;
