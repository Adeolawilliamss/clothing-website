const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Product = require("./models/productModel");
const fallbackProducts = require("../frontend/app/dashboard/data/fallbackProducts");

console.log("Seeder started");

dotenv.config({ path: "./config.env" });

const seedProducts = async () => {
  try {
    // connect to db
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // clear old products
    await Product.deleteMany();

    console.log("Old Products Deleted");

    // insert new products
    await Product.insertMany(fallbackProducts);

    console.log("Products Seeded Successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();