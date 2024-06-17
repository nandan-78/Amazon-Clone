import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    description: String,
    discount: String,
    tagline: String
});

const Products = new mongoose.model("products", productSchema); // mongodb atlas collection name written in ---> "quotes"

export default Products