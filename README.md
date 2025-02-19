# E-Commerce-_FollowAlong

## Features

### 1. Authentication Page
- User Login and Signup functionality.
- Password security with hashing.
- Token-based authentication for session management.

### 2. Product Page
- Displays a list of available products.
- Search and filter functionality for efficient product browsing.

### 3. Order Page
- View all past orders with relevant details (product name, price, date).
- Track the status of current orders.

### 4. Payment Gateway
- Multiple payment methods (credit/debit card, UPI, wallet).
- Secure transaction handling.
- Mock payment integration for testing.

---

## Tech Stack

### Frontend
- *React*: For building an interactive and dynamic user interface.
- *Next.js*: For server-side rendering and improving performance.

### Backend
- *Express.js*: For building the RESTful API to handle business logic.
- *Mongoose*: For managing the MongoDB database and creating schemas.

### Database
- *MongoDB*: To store user information, product data, orders, and payment records.

---

## Milestones

### Milestone 1: Setup Development Environment
1. Installed all necessary tools and dependencies for the MERN stack.
2. Understood server-client interaction in a full-stack application.
3. Created a basic Node.js and Express server.
----
### Milestone 2: Project Structure & Basic Frontend
1. Designed and implemented a structured folder hierarchy.
2. Set up React for the frontend and Express.js for the backend.
3. Configured Tailwind CSS for styling.
4. Added optional extensions (Prettier, ESLint) for development efficiency.
5. Built a functional and styled Login Page.
----
### Milestone 3: Backend Setup
1. Created dedicated folders for organizing backend code.
2. Configured a Node.js server using Express.
3. Established a connection to MongoDB.
4. Implemented basic error handling.
----
### Milestone 4: User Model & File Uploads
1. Created a User Model with a defined schema.
2. Developed a User Controller for user-related operations.
3. Configured Multer for handling file uploads.
----
### Milestone 5: Signup Page & Validation
1. Created a Sign-Up Page in React.
2. Implemented form validation:
   - Name (required)
   - Email (valid format required)
   - Password (minimum 2 characters)
   - Password Confirmation (must match password)
3. Used React Router for navigation.
----
### Milestone 6: User Registration & Authentication
1. Implemented a /create-user endpoint to store user details.
2. Used bcrypt.js to hash passwords before saving them to the database.
3. Implemented centralized error handling.
4. Integrated an email notification system (optional).
5. Generated JWT tokens upon successful login.
----
### Milestone 7: Login API
1. Created a login endpoint accepting email/password.
2. Verified user credentials and validated passwords using bcrypt.
3. Generated a JWT token for authentication.
4. Implemented error handling for invalid credentials and server errors.
----
### Milestone 8: Creating a Home Page
1. Designed a responsive homepage layout.
2. Implemented a grid layout for displaying product cards.
3. Ensured responsiveness for different screen sizes.
----
### Milestone 9: Creating a Product Form
1. Created a form to input product details.
2. Allowed users to upload multiple product images.
3. Saved the entered details in the database.
----
### Milestone 10: Product Schema & API Endpoint
1. Created a Mongoose schema for products.
2. Developed a POST endpoint to validate and store product data in MongoDB.
----
### Milestone 11: Fetch & Display Products
1. Created an API endpoint to fetch all products from the database.
2. Implemented a frontend function to fetch and display product data dynamically.
3. Used useState and useEffect to manage the data lifecycle.
----
### Milestone 12: Fetch & Display Filtered Products
1. Created an API endpoint to fetch products based on the user's email.
2. Implemented frontend logic to request and display filtered products.
3. Ensured efficient state management using React hooks.
----
### Milestone 13:- Edit Product Functionality
1. Created a *PUT API endpoint* to update product details in MongoDB.
2. Added an *Edit* button on the product card.
3. Implemented *auto-filled form* for editing existing product details.
4. Connected frontend with backend to send *PUT requests*.
5. Handled errors and ensured data validation.
----
### Milestone 14:- Edit & Delete Product Functionality
- Created a *PUT API endpoint* to update product details in MongoDB.
- Added an *Edit* button on the product card.
- Implemented *auto-filled form* for editing existing product details.
- Connected frontend with backend to send *PUT requests*.
- Handled errors and ensured data validation.
- Created a *DELETE API endpoint* to remove products from MongoDB.
- Added a *Delete* button to the product card.
- Integrated frontend with backend to send *DELETE requests*.
----
### Milestone 15 - Creating a Navbar Component 🚀
1. Create a New Nav Component
- The Navbar should include links to the following pages:
  - *Home*
  - *My Products*
  - *Add Product*
  - *Cart*
- Navbar is responsive and adapts to different screen sizes.

2. Add Navbar to All Pages
- Import and integrate the Nav component into all pages.
- Ensure smooth navigation between different sections of the application.

3. Make the Navigation Smooth & User-Friendly
- Use *React Router* for handling navigation.
- Implement active link highlighting for better UX.
- Optimize the layout to be mobile-friendly.

----

## Milestone 16 - Creating a Product Info Page 🛒
Create a New Product Info Page
The page should display detailed information about a product.
Include product name, image, price, and description.
Add a Quantity Selector
Allow users to select the desired quantity of the product.
Ensure the quantity selection updates dynamically.
Implement the Add to Cart Button
Add a button that allows users to add the selected quantity of the product to their cart.
Ensure smooth user interaction and feedback after adding to cart.

----

## Milestone 17: Add Products to Cart & Store in Database
Created the Cart Schema: Defined a schema to store cart products linked to users.
Implemented an API endpoint: Developed a backend route to handle adding products to the cart.
Stored Cart Data: Successfully saved product details in the database under the user's cart.

----

## Milestone 18: Fetch Products Inside Cart
Developed an API endpoint: Allowed the frontend to send requests to retrieve cart products.
Fetched Cart Data: Implemented a query to get products inside the cart for a specific user.
Tested API Responses: Ensured data retrieval worked seamlessly.
