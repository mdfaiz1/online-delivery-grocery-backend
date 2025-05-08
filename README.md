# Update README content to ensure each environment variable key is on a new line and not merged

readme_env_keys_cleaned = """
# 🛍️ Product Upload API

This is a Node.js-based API for uploading product data along with multiple images using Cloudinary. It includes JWT authentication, MongoDB integration, and uses seller credentials from environment variables.

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary
- Multer
- JWT Authentication
- dotenv

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/product-upload-api.git
cd product-upload-api
npm install




# Server Configuration
PORT=
CORS_ORIGIN=

# MongoDB
DB_NAME=
MONGO_URI=

# Cloudinary Configuration
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=

# JWT Configuration
JWT_SECRET=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

# Default Seller Credentials
SELLER_EMAIL=
SELLER_PASSWORD=

