# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12

Functionality
Key Features
API Endpoints: Implement RESTful API endpoints to facilitate data retrieval, creation, updating, and deletion for the WTWR application.
Database Integration: Integrate with a database to store and manage application data efficiently.
User Authorization: Implement authentication and authorization mechanisms to ensure secure access to the application's resources.
Security Measures: Implement encryption, input validation, and other security measures to protect against common web vulnerabilities.
Testing: Develop unit tests, integration tests, and end-to-end tests to ensure the reliability and correctness of the server-side code.
Deployment: Deploy the server on a remote machine using containerization and orchestration tools for scalability and maintainability.

Technologies and Techniques Used
Backend Technologies
Node.js: Used as the runtime environment for the server-side application.
Express: Employed as the web application framework to build robust and scalable APIs.
MongoDB: Chosen as the database to store and manage application data effectively.
JWT (JSON Web Tokens): Implemented for user authentication and authorization.
Security Measures
Helmet: Used to secure Express apps by setting various HTTP headers.
bcrypt: Employed for hashing and salting passwords to enhance security.
CORS: Implemented CORS middleware to handle cross-origin resource sharing.
Testing
Jest: Utilized for writing unit tests and integration tests for the server-side code.
Supertest: Used alongside Jest for testing HTTP endpoints and API responses.
DevOps and Deployment
Docker: Containerized the application to ensure consistent and isolated environments.
Kubernetes: Orchestrated and managed containerized applications for scalability and high availability.
CI/CD Pipeline: Implemented continuous integration and continuous deployment using Jenkins or another CI/CD tool.
Other Tools and Libraries
Mongoose: Used as an ODM (Object Data Modeling) library for MongoDB to simplify interactions with the database.
dotenv: Used for managing environment variables and configuration settings.

