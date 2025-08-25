  REST API with MongoDB (CRUD Operations)    
	
  * Project Overview
 

This project is a RESTful API built with Node.js, Express.js, and MongoDB.
It demonstrates CRUD operations (Create, Read, Update, Delete) for managing user data.

  * Features

Create → Add new users

Read → Fetch users or a specific user

Update → Modify existing user details

Delete → Remove users

Proper error handling and JSON responses

* Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

Postman (for API testing)

* Installation & Setup

Clone the repository:

git clone https://github.com/<your-username>/rest-api-mongodb.git
cd rest-api-mongodb


Install dependencies:

npm install

Create a .env file and add:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the server:

npm start

* API Endpoints
  Users
  
** Method	Endpoint	Description

GET	/users					=> Get all users
GET	/users/:id			=> Get user by ID
POST	/users				=> Create a new user
PUT	/users/:id			=> Update user by ID
DELETE	/users/:id	=> Delete user by ID


** Folder Structure

rest-api-mongodb/
│-- models/
│   └── user.js
│-- routes/
│   └── users.js
│-- index.js
│-- package.json
│-- README.md

**  Author
	Malla Guna Sekhar
