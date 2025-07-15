# Product Catalog API

A RESTful API built using **Node.js**, **Express.js**, and **MongoDB** that powers a backend for a product catalog system — similar to an e-commerce platform. The API supports full CRUD operations, inventory tracking, product variants, category management, and search/filter functionality.

---

##  Features

- Product CRUD (Create, Read, Update, Delete)
- Category CRUD
- Product search and filtering (by name, category, date)
- Product variants (e.g., size, color)
- Inventory tracking (stock levels)
- Environment configuration with `.env`
- Pricing and discounts
- Use with Postman or Thunder Client
- Reporting (e.g., low stock products)
- Input validation and error handling
- API documentation via Swagger

---

##  Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Validation:** express-validator
- **API Testing:** Postman / Insomnia
- **Documentation:** Swagger UI

---

##  Project Structure
product-catalog-api/
├── controllers/
│ ├── productController.js
│ └── categoryController.js
├── models/
│ ├── Product.js
│ └── Category.js
├── routes/
│ ├── productRoutes.js
│ └── categoryRoutes.js
├── index.js
├── .env
├── package.json
└── README.md

---


## ⚙️ Installation & Setup

### 1. Clone the Repo

git clone https://github.com/your-username/product-catalog-api.git

cd product-catalog-api


----
npm install

---

### Set up .env

PORT=5000
MONGO_URI=mongodb://localhost:27017/product_catalog

###  Create .env File

# Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=mongodb://localhost:27017/product_catalog
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h

## Start MongoDB

mongod



## Run the server
npm run dev

# You should see:

Connected to MongoDB
Server running at http://localhost:5000




## API endpoint 

# a. Categories

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/categories`     | Create a category    |
| GET    | `/categories`     | Get all categories   |
| GET    | `/categories/:id` | Get a category by ID |
| PUT    | `/categories/:id` | Update a category    |
| DELETE | `/categories/:id` | Delete a category    |


# b.  product

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/products`     | Create a product  |
| GET    | `/products`     | Get all products  |
| GET    | `/products/:id` | Get product by ID |
| PUT    | `/products/:id` | Update a product  |
| DELETE | `/products/:id` | Delete a product  |


### Testing with Postman or Thunder Client

## 1. Create a Category

- POST http://localhost:5000/categories

{
  "name": "Electronics",
  "description": "Electronic gadgets and devices"
}


## 2. Create a Product
POST http://localhost:5000/products

{
  "name": "Smartphone",
  "description": "Latest smartphone model",
  "price": 699.99,
  "category": "68765e6e7cb9b87cdfacbc37",
  "variants": [
    {
      "size": "6.1 inch",
      "color": "Black",
      "stock": 10
    }
  ]
}

## Get All Products
GET http://localhost:5000/products

## 4. Get One Product
GET http://localhost:5000/products/:id

## 55. Update a Product
PUT http://localhost:5000/products/:id

{
  "price": 749.99,
  "stock": 8
}


## 6. Delete a Product
DELETE http://localhost:5000/products/:id

### Example Category IDs for Testing
[
  {
    "_id": "68765e6e7cb9b87cdfacbc37",
    "name": "Electronics",
    "description": "Electronic gadgets and devices"
  },
  {
    "_id": "68765e7c7cb9b87cdfacbc39",
    "name": "Books",
    "description": "Fiction and non-fiction books"
  },
  {
    "_id": "68765e867cb9b87cdfacbc3b",
    "name": "Clothing",
    "description": "Men and Women clothing"
  }
]
