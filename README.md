# **RKLogistics - API & Web**

## **Overview**
RKLogistics is a platform where **Shippers**, **Carriers**, and **Drivers** can register and interact for managing shipments. This repository contains the API and Web components for the project.

### **Repositories:**
- **API:** `RKLogistics-rk-logistics-api`
- **Web:** `RKLogistics-rk-logistics-web`

---

## **Project Setup**

### **API Setup:**

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/RKLogistics-rk-logistics-api.git
   ```

2. Install dependencies:
   ```bash
   cd RKLogistics-rk-logistics-api
   npm install
   ```

3. Create a `.env` file by copying from `.env.example` and filling in the required values:
   ```bash
   cp .env.example .env
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

## **API Documentation**

### **Changelog:**
#### 19-02-2025
- **Express Server Setup:** Created Express server for handling requests.
- **Folder Structure:** Implemented **MVC** architecture for better scalability.
- **Database Connection:** Connected to **MongoDB** using **Mongoose**.
- **User Model, Route & Controller:** Created a `User` model, along with route and controller for handling user-related actions.
- **Authentication:**
  - Created **Signup** API with **Password Hashing**.
  - Created **Login** API with **JWT Authentication**.
  - Implemented **Role-based Authorization** (e.g., shipper, carrier, admin).
  - Created **Check Profile API** to fetch user profile data.
- **Validation & Error Handling:**
  - Added **Joi Validation** for all APIs to ensure input validation.
  - Tested and ensured **API functionality** for all routes.

#### 20-02-2025
- **Shipment APIs:**
  - Created **Shipment Creation API** for Shippers and Carriers.
  - Created **Get All Shipments API** for Shippers and Carriers.
  - Both APIs are now operational. ✔️

---

## **Technology Stack**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT, Bcrypt
- **Validation:** Joi
- **Version Control:** Git, GitHub

---

## **API Endpoints**

### **User APIs:**
- **POST** `/api/signup`: Create a new user with hashed password.
- **POST** `/api/login`: User login with JWT authentication.
- **GET** `/api/profile`: Check profile data of the logged-in user.

### **Shipment APIs:**
- **POST** `/api/shipment`: Create a new shipment (available for Shippers and Carriers).
- **GET** `/api/shipment`: Get all shipments for the logged-in user (Shipper or Carrier).

---

## **Frontend Setup**

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/yourusername/RKLogistics-rk-logistics-web.git
   ```

2. Install dependencies:
   ```bash
   cd RKLogistics-rk-logistics-web
   npm install
   ```

3. Run the frontend:
   ```bash
   npm start
   ```

---

## **Contributing**

We welcome contributions! To contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**
For questions or issues, please reach out to the project maintainers:
- **Your Name** (your-email@example.com)

---

### **Enjoy Building with RKLogistics!** 🚀

---

This design is clean, structured, and covers everything from project setup to usage and contribution. If you want to add any additional features or sections (like testing or deployment), feel free to customize it further!