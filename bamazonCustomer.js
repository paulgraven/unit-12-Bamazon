var mysql = require("mysql");
var inquirer = require("inquirer");

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

var product_quantity = 0;

var displayProducts = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
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
    .then(function(answer) {
      var query = "SELECT stock_quantity FROM products WHERE ?";
      connection.query(query, { product_name: answer.product }, function(
        err,
        res
      ) {
        for (var i = 0; i < res.length; i++) {
          product_quantity = res[i].stock_quantity;
          console.log("Quantity: " + product_quantity);
        }

        if (product_quantity - answer.quantity >= 0) {
          connection.query(
            "UPDATE products SET stock_quantity =' " +
              (product_quantity - answer.quantity) +
              "' WHERE product_name = '" +
              answer.product +
              "'"
          );
          console.log(product_quantity);
          console.log("Purchased!");
          displayProducts();
        } else {
          console.log("Insufficient quantity! Please slect another product");
          customer(res);
        }
      });
    });
};
