import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

//Database
import Product from './Models/Product.js';
import User from './Models/User.js';
import Order from './Models/Order.js';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//use
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));


//Database Connection
const CONNECT_DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error(error);
    }
}


app.post("/api/user-login", async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const verifyUser = await User.findOne({ userEmail });

        if (!verifyUser) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        if (verifyUser.userPassword !== userPassword) {
            return res.status(401).json({
                message: "Incorrect Password"
            });
        }

        res.status(200).json({
            message: "Login Successful",
            user: verifyUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
})


app.post("/api/user-register", async (req, res) => {
    try {

        const { userName, userEmail, userPhone, userPassword } = req.body;

        const existingUser = await User.findOne({ userEmail });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const user = await User.create({
            userName,
            userEmail,
            userPhone,
            userPassword
        });

        console.log(user);

        res.status(201).json({
            message: "User Registered Successfully",
            user
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }
})

const upload = multer({ dest: "uploads/" });

app.post("/api/add-product", upload.array("productImages", 5), async (req, res) => {
    try {
        const { productName, productDescription, productCategory, productPrice, productQuantity } = req.body;

        const images = req.files.map(file => file.filename);

        const newProduct = await Product.create({
            productName, productDescription, productPrice, productImages: images, productCategory, productQuantity
        })

        res.json({
            message: "Product Uploaded Successfully",
            product: newProduct
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error uploading product"
        });
    }
});



app.get("/api/products", async (req, res) => {
    try {
        const { productName } = req.query;
        console.log(productName);

        const products = await Product.find();
        res.json(products);
        console.log(products);

    } catch (error) {
        console.error(error);
    }
})



app.post("/api/add-to-cart", async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log(productId + userId);

        const addToCart = await User.findByIdAndUpdate(userId, {
            $push: {
                userCart: {
                    product: productId,
                    quantity: 1
                }
            }
        },
            { new: true })

        console.log(addToCart);
        res.json({
            message: "Product added to cart",
            cart: addToCart.userCart
        });


    } catch (error) {
        console.error(error);

    }
})

app.get("/api/userCart/:userId", async (req, res) => {
    try {

        const { userId } = req.params;

        const user = await User.findById(userId)
            .populate("userCart.product");

        res.json(user.userCart);

    } catch (error) {
        console.error(error);
    }
});


app.put("/api/cart/increase", async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                "userCart.product": productId
            },
            {
                $inc: { "userCart.$.quantity": 1 }
            },
            { new: true }
        );

        res.json({
            message: "Quantity increased",
            cart: user.userCart
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error" });
    }

});


app.put("/api/cart/decrease", async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                "userCart.product": productId
            },
            {
                $inc: { "userCart.$.quantity": -1 }
            },
            { new: true }
        );

        res.json({
            message: "Quantity decreased",
            cart: user.userCart
        });

    } catch (error) {
        console.error(error);
    }

});


app.delete("/api/cart/remove", async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    userCart: { product: productId }
                }
            },
            { new: true }
        );

        res.json({
            message: "Item removed from cart",
            cart: user.userCart
        });

    } catch (error) {
        console.error(error);
    }

});


app.post("/api/checkout", async (req, res) => {

    try {

        const { userId } = req.body;

        const user = await User.findById(userId)
            .populate("userCart.product");

        const total = user.userCart.reduce((sum, item) => {
            return sum + item.product.productPrice * item.quantity;
        }, 0);

        res.json({
            message: "Order placed successfully",
            totalAmount: total
        });

    } catch (error) {
        console.error(error);
    }

});


app.get("/api/products-search", async (req, res) => {

    try {

        const { productName } = req.query;

        let products;

        if (productName) {

            products = await Product.find({
                productName: { $regex: productName, $options: "i" }
            });

        } else {

            products = await Product.find();

        }

        res.json(products);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Server error" });

    }

});

app.post("/api/place-order", async (req, res) => {

    try {

        const { userId, address, city, state, pincode } = req.body;

        const user = await User.findById(userId)
            .populate("userCart.product");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let orders = [];

        for (const item of user.userCart) {

            const order = await Order.create({

                userId: userId,
                productId: item.product._id,
                quantity: item.quantity,
                amount: item.product.productPrice * item.quantity,
                address: `${address}, ${city}, ${state}, ${pincode}`

            });

            orders.push(order);

        }

        user.userCart = [];

        await user.save();

        res.json({
            message: "Order placed successfully",
            orders
        });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Order failed" });

    }

});

app.get("/api/orders/:userId", async (req, res) => {

    try {

        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .populate("productId");

        res.json(orders);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Error loading orders" });

    }

});


app.get("/api/user/:id", async (req,res)=>{

try{

const user = await User.findById(req.params.id);

res.json(user);

}catch(error){

console.error(error);

}

});



app.put("/api/update-profile", async (req, res) => {

    try {

        const { _id, userName, userPhone } = req.body;

        const user = await User.findByIdAndUpdate(
            _id,
            {
                userName,
                userPhone
            },
            { new: true }
        );

        res.json(user);

    } catch (error) {

        console.error(error);

    }

});





CONNECT_DB().then(() => {
    try {
        app.listen(PORT, () => {
            console.log(`Server Running from PORT ${PORT}`);
        })
    } catch (error) {
        console.error(error);

    }
})



