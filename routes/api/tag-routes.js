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

router.post('/',async (req, res) => {
  // create a new tag
  const tagName = req.body.tag_name;

  try {
    const data = await Tag.create({tag_name: tagName});
    res.json(data);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in creating new data"});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tagId= req.params.id;
  const tagName = req.body.tag_name;

  try {
    const data = await Tag.update(
      {
        tag_name: tagName
      },
      { 
        where: {
          id: tagId
        }
      });
    const updatedRow = await Tag.findByPk(tagId);
    res.json(updatedRow);
  }
  catch (err) {
    res.status(500).json({error: "An error occurred in updating data"});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;

  try {
    await Tag.destroy(
      { 
        where: {
          id: tagId
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
