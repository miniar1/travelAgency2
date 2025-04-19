-- Create database (run this in psql)
CREATE DATABASE trip_management;

-- Connect to the database
\c trip_management

-- Create admin table
CREATE TABLE admin (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       created_at TIMESTAMP DEFAULT NOW(),
                       updated_at TIMESTAMP DEFAULT NOW()
);

-- Create voyage/trip table
CREATE TABLE voyage (
                        id SERIAL PRIMARY KEY,
                        nomVoyage VARCHAR(255) NOT NULL,
                        description TEXT,
                        prix DECIMAL(10, 2) NOT NULL,
                        typeVoyage VARCHAR(50) NOT NULL,
                        dateDepart TIMESTAMP NOT NULL,
                        dateRetour TIMESTAMP NOT NULL,
                        image VARCHAR(255),
                        promotion DECIMAL(10, 2) DEFAULT 0,
                        created_at TIMESTAMP DEFAULT NOW(),
                        updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert a default admin user (password is 'admin123' - will be hashed in the application)
INSERT INTO admin (username, password, email)
VALUES ('admin', '$2b$10$rIC1.5iSZ6F.t9/rsZQh3eCFvd6FLWcxPyHkKfhBTMM3yRsGJTw6e', 'admin@example.com');