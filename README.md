# Product Catalog API

A RESTful API built using **Node.js**, **Express.js**, and **MongoDB**. This backend powers a product catalog similar to an e-commerce platform, supporting full CRUD operations, inventory tracking, product variants, category management, search/filtering, and more.

---

## Features

- Product CRUD (Create, Read, Update, Delete)
- Category CRUD
- Product search and filtering (by name, category, price)
- Product variants (e.g., size, color)
- Inventory tracking (stock levels)
- Environment configuration with `.env`
- Pricing and discounts
- Reporting (e.g., low stock products)
- Input validation and error handling
- API documentation via Swagger UI
- Works with Postman or Thunder Client

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Validation:** express-validator
- **API Testing:** Postman, Thunder Client, Insomnia
- **Documentation:** Swagger UI

---

## Project Structure

```
product-catalog-api/
├── config/                     # Configuration files
├── controllers/                # Request handlers
│   ├── categoryController.js
│   └── productController.js
├── middleware/                 # Custom middleware
│   ├── handleValidationErrors.js
│   ├── validate.js
│   └── validateProduct.js
├── models/                     # Mongoose schemas
│   ├── Category.js
│   ├── orderModel.js
│   └── Product.js
├── routes/                     # API route definitions
│   ├── categoryRoutes.js
│   ├── orderRoutes.js
│   └── productRoutes.js
├── node_modules/               # Installed dependencies
├── .env                        # Environment variables
├── .gitignore
├── index.js                    # Server entry point
├── package.json
├── package-lock.json
├── README.md
└── swagger.js                  # Swagger/OpenAPI documentation config
```

## Installation & Setup

### 1. Clone the Repository

```
git clone https://github.com/your-username/product-catalog-api.git
cd product-catalog-api
```

### 2. Install Dependencies

```
npm install
```

### 3. Create a `.env` File in the Project Root

Paste the following into `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/product_catalog
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
```

### 4. Start MongoDB

```
mongod
```

### 5. Run the Server

```
npm run dev
```

**If successful, you’ll see:**

- `Connected to MongoDB`
- `Server running at http://localhost:5000`

---

## API Endpoints

### Category Endpoints

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/categories`          | Get all categories       |
| GET    | `/categories/:id`      | Get category by ID/slug  |
| POST   | `/categories`          | Create category          |
| PUT    | `/categories/:id`      | Update category          |
| DELETE | `/categories/:id`      | Delete category          |

### Product Endpoints

| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | `/products`                           | Get all products             |
| GET    | `/products/:id`                       | Get product by ID            |
| POST   | `/products`                           | Create a product             |
| PUT    | `/products/:id`                       | Update a product             |
| DELETE | `/products/:id`                       | Delete a product             |
| GET    | `/products?search=tv`                 | Search products by name/desc |
| GET    | `/products?category=ID`               | Filter by category           |
| GET    | `/products?minPrice=10&maxPrice=100`  | Filter by price range        |

---

## Example Requests

### Create a Category

```
POST /categories
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic gadgets and devices"
}
```

### Create a Product

```
POST /products
Content-Type: application/json

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
```

---

## Testing with Postman or Thunder Client

**Create a Category**

```
POST http://localhost:5000/categories
```

**Create a Product**

```
POST http://localhost:5000/products
```

**Get All Products**

```
GET http://localhost:5000/products
```

**Get One Product**

```
GET http://localhost:5000/products/:id
```

**Update a Product**

```
PUT http://localhost:5000/products/:id
```

```
{
  "price": 749.99,
  "stock": 8
}
```

**Delete a Product**

```
DELETE http://localhost:5000/products/:id
```

**Filter by Category**

```
GET http://localhost:5000/products?category=68765e6e7cb9b87cdfacbc37
```

**Search by Name**

```
GET http://localhost:5000/products?search=smartphone
```

**Filter by Price Range**

```
GET http://localhost:5000/products?minPrice=100&maxPrice=800
```

---

### Example Category IDs for Testing

```
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
```

---

## Validation & Error Handling

- Validates required fields (e.g., `name`, `price`, `category`)
- Ensures `price`, `stock`, and `discount` are numbers
- Returns meaningful error messages with correct status codes
- Input sanitization using `express-validator` to prevent XSS and ensure clean input

---

## API Documentation (Swagger UI)

Visit: [http://localhost:5000/api-docs](http://localhost:5000/api-docs)  
*Live documentation with interactive try-out support.*

---

## Slug Support for Categories

Example request:
```
{
  "name": "Men's Clothing"
}
```

Slug generated:

```
mens-clothing
```

Instead of:
```
GET /categories/68765e6e7cb9b87cdfacbc37
```
You can also use:
```
GET /categories/mens-clothing
```

---

## Low-Stock Reporting Endpoint

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | `/products/low-stock`  | Get all products with low stock |

**Query Parameters:**

| Param     | Type   | Description                                        |
|-----------|--------|----------------------------------------------------|
| threshold | Number | (Optional) Stock level to consider as "low". Default: `5` |

Example usage:

```
GET http://localhost:5000/products/low-stock?threshold=3
```

---

## Security & Best Practices

- Input sanitization with `express-validator`
- Proper error handling
- .env for secrets and config
- JWT support for future authentication

---

## Advanced Filtering Examples

```
GET /products/search/filter?name=hoodie
GET /products/search/filter?category=64e5df5c1a3b5a4fa7cbb3a2
GET /products/search/filter?createdAfter=2025-07-01&createdBefore=2025-07-18
GET /products/search/filter?name=hoodie&category=64e5df5c1a3b5a4fa7cbb3a2
```

Sample category to POST:
```
{
  "name": "Furniture",
  "description": "Various types of home and office furniture including chairs, tables, and storage units."
}
```

Sample product for `GET /api/products`:
```
{
  "name": "Modern Wooden Desk",
  "description": "Spacious desk made of solid oak wood with drawers.",
  "price": 250,
  "discount": 10,
  "category": "64eea01e8bc4c22a8b199ef5",
  "variants": [
    {
      "size": "Large",
      "color": "Brown",
      "stock": 5
    },
    {
      "size": "Medium",
      "color": "Black",
      "stock": 8
    }
  ]
}
```

---

## Demonstration Video

🔗 [Demo on Loom](https://www.loom.com/share/0908740b8d5d4e70bcd7836e8251f22a?sid=e5a67074-34cf-458a-a542-cae87e206489)