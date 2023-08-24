// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

// One to one: because a product has exactly one category
Product.belongsTo(Category, { foreignKey: 'category_id' });

// Categories have many Products

// one to many: because a single category has any number of products in it
Category.hasMany(Product, { foreignKey: 'category_id' });

// Products belongToMany Tags (through ProductTag)

// many to many: because a product can have any number of tags
// AND a tag can be attached to any number of products
Product.belongsToMany(Tag, { through: ProductTag });

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
