const express = require('express');
const connectDB = require('./src/Database/db');
const userrouter = require('./src/Controllers/users');
const productrouter = require('./src/Controllers/Products');
const orderrouter = require('./src/Controllers/Order');
const cookieParser = require('cookie-parser')
const app = express();
const path = require("path");

app.use(express.json());
app.use("/productuploads", express.static("productuploads"));
app.use("/productuploads", express.static(path.join(__dirname, "productuploads")));
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',  // your frontend dev URL
  credentials: true
}));

app.use(cookieParser())

require('dotenv').config({
    path: './src/config/.env'
});

const PORT = process.env.PORT || 8000;
const url = process.env.db_url;

app.get('/', (req, res) => {   
    res.send('Hello World');
});

app.use('/order',orderrouter)
app.use('/auth', userrouter);
app.use('/product', productrouter);

app.listen(PORT, async () => {
    try {
        await connectDB(url);
        console.log(`Server is running on Port:${PORT} Link: http://localhost:${PORT}`);
    } catch (err) {
        console.log(err);
    }
});

// small p products is seller
// capital P Products in probably server side
