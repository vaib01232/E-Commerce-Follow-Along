const {Router} =require('express');
const {productupload} = require("../../multer");
const {Productmodel} = require("../Model/productModel");
const productrouter = Router();

productrouter.get("/",(req,res) => {
    res.send("Product router");
})

productrouter.post("/",productupload.array('files'),async (req,res) => {
    const{name,description,email,price,category,stock,tags} = req.body;
     const images = req.files.map(file => file.path);
     try {
        const seller = await Productmodel.findOne({email: email})
        if(!seller){
            return res.status(400).json({error: "User not found"});
        }
        if(images.length==0){
            return res.status(400).json({error: "Please upload at least one image"});
        }

        const newproduct = await Productmodel.create({
            name: name,
            email: email,
            description: description,
            category: category,
            price: price,
            stock: stock,
            tags: tags,
            images: images
        })
        return res.status(200).json({message: "Product created",product: newproduct});

     } catch (error) {
         console.log(error);
     }
})
