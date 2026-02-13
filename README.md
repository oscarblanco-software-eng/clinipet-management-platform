# Clinipet - Veterinary Management Platform 🐾

Clinipet is a professional full-stack web application designed to streamline operations for veterinary clinics. This platform focuses on secure user management, role-based access, and efficient clinic administration.

---

## 📊 Technical Skills & Proficiency

<p align="left">
  <img src="https://img.shields.io/badge/Main_Stack-Full_Stack_JS-blue?style=for-the-badge" alt="Main Stack" />
  <img src="https://img.shields.io/badge/Total_Projects-1_Featured-green?style=for-the-badge" alt="Projects" />
</p>

### 🛠️ Tech Stack & Tools
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

---

## 🚀 Project Status
The core authentication and user authorization system is fully implemented, utilizing a relational database (MySQL) to ensure high data integrity and security.

## 🗄️ Database Architecture (MySQL)

The system features a robust `users` table designed for secure access control, account recovery, and administrative auditing.

### Entity Relationship Diagram (ERD)
```mermaid
erDiagram
    USERS {
        int id PK
        string email UK
        string password
        string resetToken
        datetime tokenExpires
        enum role
        datetime createdAt
        datetime updatedAt
    }

##  Key Technical Features:
​Role-Based Access Control (RBAC): Integrated admin and user roles to manage different permission levels within the clinic.
​Secure Authentication: Implementation of secure password storage using industry-standard hashing and unique email constraints.
​Account Recovery: Built-in support for secure password reset flows using resetToken and expiration timestamps.
​Audit Ready: Automatic tracking of record creation and updates via createdAt and updatedAt timestamps.
​## Upcoming Features
​Patient Management: Digital medical records for pets.
​Appointment Scheduling: Calendar integration for veterinary consultations.
​Clinical History: Detailed logs of treatments, vaccines, and previous visits.

## ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/oscarblanco-software-eng/clinipet-management-platform.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Database Configuration:**
    * Create a MySQL database named clinipet.
​    * Import the provided SQL dump to set up the users table.
    * ​Configure your .env file with your local DB credentials.
4.  **Run the application:**
    ```bash
    npm start
    ```

## 📧 Contact

**Oscar Blanco** - Systems Engineer Student | Fullstack Developer
* **LinkedIn:** [linkedin.com/in/oscarblanco-software-eng](https://linkedin.com/in/oscarblanco-software-eng)
* **GitHub:** [github.com/tu-usuario](https://github.com/oscarblanco-software-eng)
*
