const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./src/Routers/productRoutes"); 
const app = express();


app.use(express.json()); 
app.use(cors());


mongoose.connect("mongodb+srv://vaibhaav2006:vaibhaav2006@cluster0.fosaa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("MongoDB Connection Error:", err));


app.use("/products", productRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
