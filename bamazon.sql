DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
('Laptops','Computers','1000','50'),
('iPads','Computers','700','100'),
('Keyboards','Accessories','30','200'),
('Mouse','Accessories','20','200'),
('Monitors','Displays','100','150'),
('TV','Displays','700','50'),
('Desks','Furniture','200','100'),
('Chairs','Furniture','100','100'),
('Notebooks','Office Supplies','5','500'),
('Pens','Office Supplies','1','1000');


SELECT * FROM products;