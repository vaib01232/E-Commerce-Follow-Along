const { Router } = require('express');
const { productupload } = require('../../multer');
const Productmodel = require('../Model/Productmodel');
const userModel = require("../Model/userModel");
const productrouter = Router();
const path = require('path');
const { userInfo } = require('os');
const mongoose = require('mongoose');
const { upload , resizeProductImages } = require("../../multer");
const HomeProductModel = require("../Model/HProductSchema");

productrouter.get("/get-products", async (req, res) => {
    try {
        const products = await Productmodel.find();

        const formattedProducts = products.map((product) => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                tags: product.tags,
                price: product.price,
                stock: product.stock,
                email: product.email,
                images: product.images,
                createdAt: product.createdAt,
            };
        });

        return res.status(200).json({ products: formattedProducts });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.get("/get-home-products", async (req, res) => {
    try {
        const products = await HomeProductModel.find();
        const formattedProducts = products.map((product) => ({
            id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            tags: product.tags,
            price: product.price,
            stock: product.stock,
            email: product.email,
            images: product.images,
            createdAt: product.createdAt,
        }));

        return res.status(200).json({ products: formattedProducts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



productrouter.post('/cart', async (req, res) => {
    const { email, productid, productname, quantity } = req.body;
    console.log('Received POST request for /product/cart');

    try {
        if (!email) {
            return res.status(404).json({ message: "fill all inputbox" });
        }

        if (!mongoose.Types.ObjectId.isValid(productid)) {
            return res.status(400).json({ message: 'product is not there' });
        }

        if (!quantity || quantity < 0) {
            return res.status(400).json({ message: 'you dont have neccessary quantity' });
        }

        const findemail = await userModel.findOne({ email: email });
        if (!findemail) {
            return res.status(440).json({ message: 'user does not exist' });
        }

        const findproduct = await Productmodel.findById(productid);
        if (!findproduct) {
            return res.status(400).json({ message: 'product is not exist ' });
        }

        const cartproductid = await findemail.cart.findIndex((i) => {
            return i.productid === productid;
        });

        if (cartproductid > -1) {
            findemail.cart[cartproductid].quantity += quantity;
        } else {
            findemail.cart.push({ productid, productname, quantity });
        }

        await findemail.save();

        res.status(200).json({ message: "Added to cart successfully" });
    } catch (err) {
        console.log("error in cart", err);
        res.status(500).json({ message: "Server error" });
    }
});


productrouter.get('/cartproducts', async (req, res) => {
    try {
        const { email } = req.query; 

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email }).populate({
            path: 'cart.productid',
            model: Productmodel
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Cart fetched successfully", cart: user.cart });
    } catch (err) {
        console.log("❌ Error in cart GET route:", err);
        res.status(500).json({ message: "Server error" });
    }
});



productrouter.put('/edit-cart', async (req, res) => {
    const { email, productid, quantity } = req.body;
    try {
        if (!email || !productid || quantity == undefined) {
            return res.status(404).json({ message: "put all details" });
        }

        const finduser = await userModel.findOne({ email: email });
        if (!finduser) {
            return res.status(500).json({ message: "user is not found" });
        }

        const findproduct = await Productmodel.findOne({ _id: productid });
        if (!findproduct || findproduct.stock <= 0) {
            return res.status(404).json({ message: "product not available" });
        }

        const findcartproduct = finduser.cart.find(item => item.productid === productid);
        if (!findcartproduct) {
            return res.status(404).json({ message: "can not find" });
        }

        findcartproduct.quantity = quantity;
        await finduser.save();

        return res.status(200).json({ message: "edited successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.post(
    "/post-product",
    productupload.array("images"), // Keep the image upload middleware
    async (req, res) => {
      const { name, description, category, tags, price, stock, email } = req.body;
      let images = [];
  
      try {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "Please upload at least one image" });
        }
  
        try {
          images = req.files.map((file) => `productuploads/${file.filename}`);
        } catch (fileErr) {
          console.error("❌ Error mapping files:", fileErr);
          return res.status(500).json({ message: "Error processing uploaded files" });
        }
  
        const seller = await userModel.findOne({ email: email });
        if (!seller) {
          return res.status(400).json({ message: "Seller not found" });
        }
  
        const newproduct = await Productmodel.create({
          name,
          description,
          category,
          tags,
          price,
          stock,
          email,
          images
        });
  
        res.status(201).json({ message: "Product added successfully", product: newproduct });
      } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  



productrouter.put('/edit-product/:id', productupload.array('files', 10), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, tags, price, stock, email } = req.body;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }

        let updateimages = existproduct.images;
        if (req.files && req.files.length > 0) {
            updateimages = req.files.map((img) => {
                return `/product/${path.basename(img.path)}`;
            });
        }

        existproduct.name = name;
        existproduct.description = description;
        existproduct.category = category;
        existproduct.tags = tags;
        existproduct.price = price;
        existproduct.stock = stock;
        existproduct.email = email;
        existproduct.images = updateimages;

        await existproduct.save();

        res.status(200).json({ product: existproduct });
    } catch (err) {
        console.log('error in updating');
        res.status(500).json({ message: "Server error" });
    }
});


productrouter.delete('/delete-product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const existproduct = await Productmodel.findById(id);

        if (!existproduct) {
            return res.status(400).json({ message: "Product does not exist" });
        }

        await existproduct.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        console.log('error in delete');
        res.status(500).json({ message: "Server error" });
    }
});


productrouter.get('/my-products', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const products = await Productmodel.find({ email });

        res.status(200).json({ products });
    } catch (err) {
        console.error('Error fetching user products:', err);
        res.status(500).json({ message: "Server error" });
    }
});

productrouter.get('/product/:id', async (req, res) => {
    try {
        const product = await Productmodel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ product });
    } catch (err) {
        console.error("Error fetching single product:", err);
        res.status(500).json({ message: "Server error" });
    }
});



productrouter.put('/cartproduct/quantity', async (req, res) => {
    console.log('PUT /cartproduct/quantity hit');
    const { email, productid, quantity } = req.body;
    console.log(quantity)
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productIndex = user.cart.findIndex(item => item.productid.toString() === productid);
        if (productIndex === -1) {
            
            return res.status(404).json({ message: "Product not found in cart" });
        }
        if (quantity===0){
            user.cart.splice(productIndex,1);
            await user.save();
            return res.status(200).json({message:"Product removed."})
        }
        user.cart[productIndex].quantity = quantity;
        await user.save();
        res.status(200).json({ message: "Cart quantity updated", cart: user.cart });
    } catch (err) {
        console.error("Error updating cart quantity:", err);
        res.status(500).json({ message: "Server error" });
    }
});




module.exports = productrouter;
