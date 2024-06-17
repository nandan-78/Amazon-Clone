import express from 'express';

const router = new express.Router();


import Products from '../models/productSchema.js';
import USER from '../models/userSchema.js';

import bcrypt from 'bcryptjs';
import authenticate from '../middleware/authenticate.js';
import stripe from 'stripe';
stripe("sk_test_51PA7UzSDjQw0ajaPd05IY1JxQyYDvr05rfvZ2WPd55qKX1jShI0oe5dsiAehYxuYStrdQVxUNlLhYC3d92pCkiaG00TxixIGKE");


//get products data api --->
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log("console the data", productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log(`error ${error.message}`);
    }
});

//register data
router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
        console.log("bhai nathi present badhi details");
    };

    try {

        const preuser = await USER.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new USER({
                fname, email, mobile, password, cpassword
            });

            // yaha pe hasing krenge ---> password Hashing

            const storedata = await finaluser.save();
            console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("error the bhai catch ma for registratoin time" + error.message);
        res.status(422).send(error);
    }

});

//login page
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "fill all the data" })
    };
    try {
        const userlogin = await USER.findOne({ email: email });
        // console.log(userlogin + "user value")

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log((isMatch));

            //token generation
            const token = await userlogin.generateAuthtoken();
            // console.log(token);
            res.cookie("Amazonweb", token, {
                expires: new Date(Date.now() + 90000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({ error: "password is wrong" })
            } else {
                res.status(201).json(userlogin)
            }

        } else {
            res.status(400).json({ error: "password is wrong" })
        }
    } catch (error) {
        res.status(400).json({ error: "invalid crediential pass" });
        console.log("error the bhai catch ma for login time" + error.message);

    }
});

//adding the data into cart 
router.post("/addcart/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id })
        console.log(cart + "cart value");

        const Usercontact = await USER.findOne({ _id: req.userID });
        console.log(Usercontact + "user milta hain");

        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData + " thse save wait kr");
            console.log(Usercontact + "userjode save");
            res.status(201).json(Usercontact);
            console.log("data added into cart");
        } else {
            res.status(401).json({ error: "Invalid user" })
        }

    } catch (error) {
        res.status(401).json({ error: "Invalid user" })

    }
})



//get individual product data
router.get("/getproductsone/:id", async (req, res) => {

    try {
        const { id } = req.params;
        // console.log(id);

        const individual = await Products.findOne({ id: id });
        console.log(individual + "one item found");

        res.status(201).json(individual);
    } catch (error) {
        res.status(400).json({ error: "Threre is an error" });
    }
});

//get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        res.status(201).json(buyuser)
    } catch (error) {
        console.log("error" + error);

    }

});

//get valid user

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        res.status(201).json(validuserone)
    } catch (error) {
        console.log("error" + error);

    }

});
//Remove item from cart 
router.delete("/remove/:id", authenticate, (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curval) => {
            return curval.id != id;
        });
        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");
    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);

    }
});

//for logout
router.get("/logout", authenticate, (req, res) => {
    try {
        req.rootUser.token = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token;

        });

        res.clearCookie("Amazonweb", { path: "/" });

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("User logged out");

    } catch (error) {
        console.log("Error");

    }
});

//payment API ---> stripe payment gateway
// router.post("/checkout", async (req, res) => {
//     const { products } = req.body;
//     // console.log(products);
//     console.log("found products");

//     const lineItems = products.map((product) => ({
//         price_data: {
//             currency: "inr",
//             product_data: {
//                 name: product.title.longTitle,
//                 images: [product.detailUrl]
//             },
//             unit_amount: product.price * 100,
//         },
//         quantity: 1
//     }));

//     console.log("found secon");


//     const payment = await stripe.Checkout.ses.create({

//         payment_method_types: ["card"],
//         line_items: lineItems,
//         mode: "payment",
//         success_url: "http://localhost:3000/sucess",
//         cancel_url: "http://localhost:3000/cancel",


//     });

//     res.json({ id: payment.id })
// })



export default router;