var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    startPrompt();
  });


function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Want to see our inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            options();
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}
function options() {


    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [10, 30, 30, 30, 30]
    });

    listOptions();

    function listOptions() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log("");
            console.log(table.toString());
            console.log("");
            goShopping();
        });
    }
}

function goShopping() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many would you like to purchase?",

        }
    ]).then(function(answer) {


        connection.query("SELECT * FROM products WHERE item_id=?", answer.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (answer.inputNumber > res[i].stock_quantity) {

                    console.log("===================================================");
                    console.log("Sorry this item is out of stock");
                    console.log("===================================================");
                    startPrompt();

                } else {
                
                    console.log("You've selected:");
                    console.log("----------------");
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + answer.inputNumber);
                    console.log("----------------");
                    console.log("Total: " + res[i].price * answer.inputNumber);
                   startPrompt();
                }
            }
        });
    });
}


 