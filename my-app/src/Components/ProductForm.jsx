import React, { useState } from 'react';
import axios from 'axios';
import './ProductForm.css'

export const ProductForm = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [tag, setTag] = useState('');
    const [email, setEmail] = useState('');

    const [preview, setPreview] = useState([]);
    const [image, setImage] = useState([]);

    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setImage((prev) => [...prev, ...files]);
        const img = files.map((file) => URL.createObjectURL(file));
        setPreview(img);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('stock', stock);
        formData.append('tag', tag);

        image.forEach((file) => {
            formData.append('image', file);
        });

        console.log(formData);
        alert('Product added successfully');

        const res = await axios.post('http://localhost:5173/productForm', formData);

        if (res.status === 200) {
            setName('');
            setEmail('');
            setPrice('');
            setDescription('');
            setCategory('');
            setStock('');
            setTag('');
            setImage([]);
            setPreview([]);
        }
    };

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
                <div className="div-email">
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="div-name">
                    <label>Name</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="div-price">
                    <label>Price</label>
                    <input
                        type="number"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        placeholder="Enter the price"
                    />
                </div>

                <div className="div-description">
                    <label>Description</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Enter a description"
                    />
                </div>

                <div className="div-category">
                    <label>Category</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        placeholder="Enter the category"
                    />
                </div>

                <div className="div-stock">
                    <label>Stock</label>
                    <input
                        type="number"
                        required
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        placeholder="Enter stock available"
                    />
                </div>

                <div className="div-tag">
                    <label>Tag</label>
                    <input
                        type="text"
                        required
                        onChange={(e) => setTag(e.target.value)}
                        value={tag}
                        placeholder="Enter the tag"
                    />
                </div>

                <div className="div-image">
                    <label>Product Image</label>
                    <input
                        type="file"
                        multiple
                        required
                        onChange={handleImage}
                    />
                </div>

                <div>
                    <button className='submit-btn' type="submit">Submit</button>
                </div>

                <div className="div-preview">
                    {preview.map((img, index) => (
                        <img src={img} alt="preview" key={index} />
                    ))}
                </div>
            </form>
        </div>
    );
};
