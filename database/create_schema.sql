CREATE DATABASE IF NOT EXISTS surti_traders;

USE surti_traders;

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

CREATE TABLE Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(255)
);

CREATE TABLE Items (
    item_id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    size VARCHAR(50),
    category_id INT,
    quantity INT NOT NULL DEFAULT 0,
    price DECIMAL(10, 2),
    total_price DECIMAL(10, 2) GENERATED ALWAYS AS (quantity * price) STORED,
    supplier_id INT NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);
