"use strict";

var fs = require("fs");

var writeFile = function writeFile(todoList) {
  var todoJSON = JSON.stringify(todoList);
  fs.writeFileSync("data.json", todoJSON);
};

var loadData = function loadData() {
  var todoList = fs.readFileSync("data.json").toString();
  todoList = JSON.parse(todoList);
  return todoList;
};

var createTodo = function createTodo(todo, status) {
  var todoList = loadData();
  todoList.push({
    todo: todo,
    status: status
  });
  writeFile(todoList);
};

var deleteData = function deleteData(id) {
  var todoList = loadData();
  todoList.splice(id - 1, 1);
  writeFile(todoList);
};

var changeStatus = function changeStatus(id) {
  var todoList = loadData();

  if (todoList[id - 1].status == true) {
    todoList[id - 1].status = false;
  } else {
    todoList[id - 1].status = true;
  }

  writeFile(todoList);
};

module.exports = {
  loadData: loadData,
  createTodo: createTodo,
  deleteData: deleteData,
  changeStatus: changeStatus
};