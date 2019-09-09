var mysql = require("mysql");
var inquirer = require("inquirer");

var product_name = [];
var department_name = [""];
var price = 0;
var stock_quantity = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Altringer9(",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  displayProducts();
});
var displayProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      product_name.push(res[i].product_name);
      console.log(
        res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity +
          "\n"
      );
    }
    customer(res);
  });
};

var customer = function(res) {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "product",
        message: "Select product to purchase",
        choices: [
          "Laptops",
          "iPads",
          "Keyboards",
          "Mouse",
          "Monitors",
          "TV",
          "Desks",
          "Chairs",
          "Notebooks",
          "Pens"
        ]
      },
      {
        type: "input",
        name: "quantity",
        message: "Enter number of units to purchase"
      }
    ])
    .then(function(customerResponse) {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var product_quantity = connection.query(
          "SELECT stock_quantity FROM products WHERE product_name ='" +
            customer.choices +
            "'"
        );
        console.log(customer.product);
        console.log(product_quantity);

        // if (product_quantity - customerResponse.quantity > 0) {
        //   connection.query(
        //     "UPDATE products SET stock_quantity =' " +
        //       (product_quantity - customerResponse.quantity) +
        //       "' WHERE product_name = '" +
        //       customer.product +
        //       "'",
        //     console.log("Purchased!")
        //   );
        //   displayProducts();
        // } else {
        //   console.log("Insufficient quantity! Please slect another product");
        //   customer(res);
        // }
      });
    });
};
