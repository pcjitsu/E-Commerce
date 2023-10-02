const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll(
      {include: [
        {
            model: Product,
            through: ProductTag,
          //  attributes: ['product_name']
        },
       /* {
            model: ProductTag,
            attributes: ['product_id', 'tag_id']
        }  */
      ]}
    ); 
    res.json(tagData);
  }
  catch (err) {
    console.log("Error: ", err);
    res.status(500).json(err);
  }
  });

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
  const singleTagData = await Tag.findByPk(req.params.id, {include: [ {
    model: Product,
    through: ProductTag,

}
]});
res.json(singleTagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
  });

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
})
.then(dbTagData => res.json(dbTagData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
        id: req.params.id
    }
    }).then(dbTagData => {
        if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id' });
            return;
        }
        res.json(dbTagData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
    }
    res.json(dbTagData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
