const fs= require("fs");

const writeFile=(todoList)=>{
    let todoJSON= JSON.stringify(todoList);
    fs.writeFileSync("data.json",todoJSON);
}
const loadData=()=>{
    let todoList=fs.readFileSync("data.json").toString();
    todoList=JSON.parse(todoList);
    return todoList;
}
const createTodo=(todo,status)=>{
    const todoList = loadData();
    todoList.push({todo:todo,status:status})
    writeFile(todoList);
}
const deleteData=(id)=>{
    const todoList = loadData();
    todoList.splice(id-1,1);
    writeFile(todoList);

}
const changeStatus=(id)=>{
    const todoList = loadData();
    if (todoList[id-1].status==true){
        todoList[id-1].status=false
    }else{
        todoList[id-1].status=true
    }
    writeFile(todoList);

}
module.exports={
    loadData:loadData,
    createTodo:createTodo,
    deleteData:deleteData,
    changeStatus:changeStatus,
}