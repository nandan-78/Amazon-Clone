import Products from "./models/productSchema.js";
import productdata from './constant/productsdata.js';

const DefaultData = async () => {
    try {

        await Products.deleteMany({}) // to remove data on every save

        const storeData = await Products.insertMany(productdata);
        console.log(storeData);
    } catch (error) {
        console.log("error" + error.message);
    }
};

export default DefaultData;