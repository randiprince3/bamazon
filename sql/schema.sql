DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

use bamazon;

CREATE TABLE products (
	id INT NOT NULL auto_increment,
    item_id INT NOT NULL,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(40) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT,
    UNIQUE (item_id),
    PRIMARY KEY (id)
);


SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES
	(1234, "Headphones", "Electronics", 200.00, 20),
    (2345, "Laptop", "Electronics", 1000.00, 10),
    (3456, "Coffee", "Food", 8.00, 50),
    (4567, "Basketball", "Sports", 30.00, 15),
    (5678, "Laker Tickets", "Sports", 500.00, 10),
    (6789, "iPhone", "Electronics", 800.00, 30),
    (7890, "Chocolate", "Food", 3.00, 100),
    (8901, "Sneakers", "Clothing", 80.00, 45),
    (9012, "Joggers", "Clothing", 45.00, 60),
    (0123, "Aspirin", "Health & Wellness", 4.00, 200);
    
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

