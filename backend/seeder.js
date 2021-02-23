import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // limpia la DB antes de importar
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // importo los usuarios
    const createdUsers = await User.insertMany(users);

    // agrego el usuario administrador a los productos
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // inserto los productos iniciales
    await Product.insertMany(sampleProducts);

    console.log('data imported'.magenta.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`.red.bold);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // limpia la DB
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('data destroyed'.magenta.bold);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

process.argv[2] === '-d' ? destroyData() : importData();
