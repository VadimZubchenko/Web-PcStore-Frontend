Here is the updated `README.md` for the project, incorporating the uploaded image:
---
*The project is under development...*
---

# Easy Inventory Management

![image](https://github.com/VadimZubchenko/WebApp-PcStore-Backend/assets/36922064/8ac9ffbe-dfb3-4fac-9448-ab67142491e7)


This project is designed to facilitate easy management of inventory for PC stores. It consists of a backend and a frontend, utilizing modern web technologies to provide a seamless user experience.

## Technologies and Tools

- **Spring Boot 2+**: A powerful framework for building Java applications quickly and efficiently.
- **Spring Data JPA (Hibernate)**: A module for managing relational data in Java applications using the Java Persistence API.
- **Spring Security**: A security framework for securing Java applications.
- **Maven**: A build automation tool used primarily for Java projects.
- **JDK**: Java Development Kit, necessary for developing Java applications.
- **Embedded Tomcat 8.5+**: An embedded web server and Servlet container.
- **MySQL Database**: A relational database management system.
- **Node.js**: A JavaScript runtime for executing server-side code.
- **React**: A JavaScript library for building user interfaces.
- **Redux**: A state management library for JavaScript applications.

## Repository Links

- **Backend Repository**: [WebApp-PcStore-Backend](https://github.com/VadimZubchenko/WebApp-PcStore-Backend.git)
- **Frontend Repository**: [WebApp-PcStore-Frontend](https://github.com/VadimZubchenko/WebApp-PcStore-Frontend.git)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Java Development Kit (JDK) 8 or later
- Maven 3.6.0 or later
- MySQL Database
- Node.js 12 or later
- npm (Node Package Manager)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Clone the Repositories

#### Backend

```sh
git clone https://github.com/VadimZubchenko/WebApp-PcStore-Backend.git
cd WebApp-PcStore-Backend
```

#### Frontend

```sh
git clone https://github.com/VadimZubchenko/WebApp-PcStore-Frontend.git
cd WebApp-PcStore-Frontend
```

### 2. Configure the Database

![image](https://github.com/VadimZubchenko/WebApp-PcStore-Frontend/assets/36922064/0dd4223d-5e87-40ae-851f-c049cd60b96f)

Create a MySQL database and update the `application.properties` file in the backend repository with your database credentials.

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

### 3. Build and Run the Backend

Navigate to the backend repository directory and use Maven to build and run the project.

```sh
mvn clean install
mvn spring-boot:run
```

### 4. Build and Run the Frontend

Navigate to the frontend repository directory and install the dependencies. Then, start the frontend server.

```sh
npm install
npm start
```

### 5. Access the Application

Once both the backend and frontend are running, you can access the application at `http://localhost:3000`.

## Project Structure

### Backend

- **src/main/java**: Contains the source code of the backend application.
- **src/main/resources**: Contains configuration files and static resources.
- **pom.xml**: The Maven project descriptor file.

### Frontend

- **src/**: Contains the source code of the frontend application.
- **public/**: Contains static assets.
- **package.json**: The Node.js project descriptor file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Maven Documentation](https://maven.apache.org/guides/index.html)
- [Hibernate Documentation](https://hibernate.org/orm/documentation/)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Documentation](https://redux.js.org/introduction/getting-started)

---

**Start managing your inventory efficiently with Easy Inventory Management!**

---
