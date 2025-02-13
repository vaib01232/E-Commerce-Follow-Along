const express = require("express");
const { Productmodel } = require("../Model/productModel");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Productmodel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// Get product by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Productmodel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
});

// Update product by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Productmodel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Productmodel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

module.exports = router;
