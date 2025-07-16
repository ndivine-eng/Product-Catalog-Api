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
- my application

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
├── config/                         # Configuration files (if needed in future)
│
├── controllers/                   # Request handlers
│   ├── categoryController.js      # Logic for category endpoints
│   └── productController.js       # Logic for product endpoints
│
├── middleware/                    # Custom middleware
│   └── validateProduct.js         # Validation middleware using express-validator
│
├── models/                        # Mongoose schemas
│   ├── Category.js                # Category model
│   └── Product.js                 # Product model (with variants, stock, etc.)
│
├── routes/                        # API route definitions
│   ├── categoryRoutes.js          # Category routes
│   └── productRoutes.js           # Product routes
│
├── node_modules/                  # Installed dependencies
│
├── .env                           # Environment variables (Mongo URI, PORT, etc.)
├── .gitignore                     # Ignored files/folders for git
├── index.js                       # Main server entry point
├── package.json                   # Project metadata and scripts
├── package-lock.json              # Exact dependency versions
├── README.md                      # Project documentation
└── swagger.js                     # Swagger/OpenAPI documentation config


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

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/categories`     | Get all categories |
| GET    | `/categories/:id` | Get category by ID |
| POST   | `/categories`     | Create category    |
| PUT    | `/categories/:id` | Update category    |
| DELETE | `/categories/:id` | Delete category    |


# b.  product

| Method | Endpoint                             | Description                  |
| ------ | ------------------------------------ | ---------------------------- |
| GET    | `/products`                          | Get all products             |
| GET    | `/products/:id`                      | Get product by ID            |
| POST   | `/products`                          | Create a product             |
| PUT    | `/products/:id`                      | Update a product             |
| DELETE | `/products/:id`                      | Delete a product             |
| GET    | `/products?search=tv`                | Search products by name/desc |
| GET    | `/products?category=ID`              | Filter products by category  |
| GET    | `/products?minPrice=10&maxPrice=100` | Filter by price range        |


### Example request 

# Create a Category
POST /categories

{
  "name": "Electronics",
  "description": "Electronic gadgets and devices"
}

# Create a Product

POST /products

{
  "name": "Smartphone",
  "description": "Latest smartphone model",
  "price": 699.99,
  "discount": 50,
  "stock": 10,
  "category": "68765e6e7cb9b87cdfacbc37",
  "variants": [
    {
      "size": "6.1 inch",
      "color": "Black",
      "stock": 5
    },
    {
      "size": "6.7 inch",
      "color": "Silver",
      "stock": 5
    }
  ]
}


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



##  7. Filter by Category
GET http://localhost:5000/products?category=68765e6e7cb9b87cdfacbc37

## 8. Search by Name

GET http://localhost:5000/products?search=smartphone

## 9. Filter by Price Range

GET http://localhost:5000/products?minPrice=100&maxPrice=800

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


### Validation & Error Handling

Validates required fields (name, price, category)

Ensures price, stock, discount are numbers

Returns meaningful error messages with correct status codes


### Swagger UI documentation

Visit: http://localhost:5000/api-docs


To explore all available endpoints with live documentation powered by **Swagger UI**.

---

## Slug Support

Categories automatically generate a **slug** based on their name, which makes URLs cleaner and more human-readable.

For example:

{
  "name": "Men's Clothing"
}

Will generate a slug:

mens-clothing

So instead of:

GET /categories/68765e6e7cb9b87cdfacbc37

You can do:
GET /categories/mens-clothing

## sanitization techniques
- Input sanitization is handled using `express-validator` to prevent XSS and ensure clean user input.

### Low-stock reporting endpoint

Low-Stock Reporting Endpoint
This endpoint helps you identify products that are running low in stock (including base stock and variant stock if applicable)

## End point

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| GET    | `/products/low-stock` | Get all products with low stock |

## Query Parameters
| Param     | Type   | Description                                                  |
| --------- | ------ | ------------------------------------------------------------ |
| threshold | Number | (Optional) Stock level to consider as "low". Default is `5`. |

## GET http://localhost:5000/products/low-stock?threshold=3

GET http://localhost:5000/products/low-stock?threshold=3

## Sample Response

[
  {
    "_id": "687700c93c8d27880b9f9001",
    "name": "Basic Phone",
    "description": "Simple phone",
    "price": 49.99,
    "stock": 2,
    "category": {
      "_id": "68765e6e7cb9b87cdfacbc37",
      "name": "Electronics"
    },
    "variants": [],
    "__v": 0
  }
]
