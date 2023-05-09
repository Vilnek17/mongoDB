// import mongoose from "mongoose";
// import express from "express";
// import { productsSchema } from "./model/product";
// import { Product } from './model/product.js';
// import {Customer} from './model/customer';

// const PORT = 8000;
// const url = 'mongodb://localhost:27017/shop';
// const app = express();

// const connection = mongoose.createConnection(url, {maxPoolSize: 10})

// const Product = connection.model('product', productsSchema);

// connection.on('open', () => {
//     console.log('Connected to the database!');
//     app.listen(PORT, ()=> {
//         console.log(`Server started on http://localhost:${PORT}`);
//     })
//   });
  
//   connection.on('error', (err) => {
//     console.error(`Database connection error: ${err}`);
//   });

//   const getPurchases = async () => {
//     const customers = await Customer.find();
//     const purchases = [];
  
//     for (const customer of customers) {
//       const product = await Product.findOne({ _id: customer.product_id });
  
//       purchases.push({
//         name: customer.name,
//         title: product.title,
//         price: product.price
//       });
//     }
  
//     return purchases;
//   };

//         app.get('/', async (req, res) => {
//         const purchases = await getPurchases();

//         let page = '<h2>Users purchases:</h2>';

//         for (const purchase of purchases) {
//             page += `<div style="display: flex; justify-content: space-around; width: 200px; border: 1px solid black; margin-bottom: 12px"><span>${purchase.name}</span> <span>${purchase.title}</span> <span>Price: ${purchase.price}</span></div><br>`;
//             }

//         res.send(html);
// });
        
import express from 'express';
import mongoose from 'mongoose';
import {Product} from './model/product.js';
import {  Customer } from './model/customer.js';

// const url = 'mongodb://localhost:27017/shop';
const url = 'mongodb://127.0.0.1:27017/shop';
const port = 8000;

const app = express();
mongoose.connect(url)
        .then(()=> {
            console.log(`Connected to DB`);
            app.listen(port, ()=> {
                console.log(`Server started on http://localhost:${port}`); 
            })
        })
  .catch((err) => { console.log(`DB connection error: ${err}`) });

const getPurchases = async () => {
  const customers = await Customer.find();
  const purchases = [];

  for (const customer of customers) {
    const productes = await Product.findOne({ _id: customer.product_id });

    purchases.push({
      name: customer.name,
      title: productes.title,
      price: productes.price
    });
  }

  return purchases;
};

app.get('/', async (req, res) => {
  const purchases = await getPurchases();

  let html = '<h2>Users purchases:</h2>';

  for (const purchase of purchases) {
    html += `<div style="display: flex; justify-content: space-between; width: 200px; border: 1px solid black; margin-bottom: 16px"><span>${purchase.name}</span> <span>${purchase.title}</span> <span>Price: ${purchase.price}</span></div><br>`;
  }

  res.send(html);
});