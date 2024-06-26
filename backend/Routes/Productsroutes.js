const express = require('express');
const router = express.Router();
const {authenticate,authorized} = require('../middleware/authentication');
const {getAllProducts,updateProduct,deleteProduct,getSingleProducts,createProduct,uploadImage,getFilterProducts} = require('../Controller/ProductsController');

router.route('/').get(getAllProducts).post(createProduct) 
router.route('/:id').get(getSingleProducts).patch(authenticate,authorized('admin'),updateProduct).delete(deleteProduct);

router.route('/filter').post(getFilterProducts);

module.exports = router;


// .post(authenticate,authorized('admin'),uploadImage);