"use strict";

var yargs = require("yargs");

var todoController = require("./controller");

var chalk = require("chalk");

yargs.command({
  command: "list",
  describe: "show the todo list",
  handler: function handler() {
    var data = todoController.loadData();

    for (var i = 0; i < data.length; i++) {
      console.log("========================");
      console.log("|| ID:", " ", i + 1);

      if (data[i].status == false) {
        console.log(chalk.blue("|| TODO : ", data[i].todo));
      } else {
        console.log(chalk.green("|| TODO : ", data[i].todo));
      }

      console.log("|| COMPLETE : ", data[i].status);
      console.log("========================");
    }
  }
});
yargs.command({
  command: "create",
  describe: "create the new todo",
  builder: {
    todo: {
      describe: "The thing to do",
      demandOption: true,
      type: "string"
    },
    status: {
      describe: "complete or not ",
      demandOption: true,
      type: "boolean",
      "default": false
    }
  },
  handler: function handler(arg) {
    console.log("what value we have in arg ?", arg);
    todoController.createTodo(arg.todo, arg.status);
  }
});
yargs.command({
  command: "delete",
  describe: "delete by id ",
  builder: {
    id: {
      describe: "index",
      demandOption: true,
      type: "string"
    }
  },
  handler: function handler(arg) {
    todoController.deleteData(parseInt(arg.id));
    var data = todoController.loadData(); // console.log(chalk.green("delete :" ),data[parseInt(arg.id)-1].todo)
  }
});
yargs.command({
  command: "change",
  describe: "change status by id ",
  builder: {
    id: {
      describe: "index",
      demandOption: true,
      type: "string"
    }
  },
  handler: function handler(arg) {
    var data = todoController.loadData();
    var from = data[parseInt(arg.id) - 1].status;
    todoController.changeStatus(parseInt(arg.id));
    var data2 = todoController.loadData();
    var to = data2[parseInt(arg.id) - 1].status;
    console.log(chalk.green("change status of "), chalk.blue(data2[parseInt(arg.id) - 1].todo), chalk.green("from : "), from, chalk.green("to "), to);
  }
});
yargs.parse();