import mongoose from "mongoose";

// const DB = process.env.DATABASE;
const DB = "mongodb+srv://nitin:test234@cluster0.wfitvol.mongodb.net/amazon-pro?retryWrites=true&w=majority&appName=Cluster0";

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useCreateIndex: true,
    })
    .then(() => console.log("Database Connected"))
    .catch((error) => console.log("error" + error.message))

export default DB;