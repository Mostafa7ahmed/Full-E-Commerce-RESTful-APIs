const categoryModel = require('../Models/category.module');
const getCategories =  (req, res) => {
  const name = req.body.name;
  console.log(req.body);
  const newCategory = new categoryModel({ name  });
   newCategory.save().then((doc)=>{
    res.json(doc)

   }).catch((err)=>{ 
    res.status(400).json(err)

   })
};

module.exports =  {
    getCategories
}