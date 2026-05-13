const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");

const router = express.Router();

// Public
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

// Admin only
router.use(authController.protect);
router.use(authController.restrictTo("admin"));

router.post("/", productController.createProduct);
router.patch("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;