window.setTimeout(function() {

  var todos = ["Buy New Turtle"];

  var input = prompt("What would you like to do?");

  while (input != "quit") {

    if (input === "list") {
      listTodos();
    }
    else if (input === "new") {
      addTodo();
    }
    else if (input === "delete") {
      deleteTodo();
    }

    input = prompt("What would you like to do?");

  }

  console.log("OK, YOU QUIT THE APP");

  function listTodos() {
    todos.forEach(function(todo, i) {
      console.log("**********");
      console.log(i + ": " + todo);
      console.log("**********");
    });
  }

  function addTodo() {
    var newTodo = prompt("Enter new Todo:");
    todos.push(newTodo);
    console.log("Added Todo");
  }

  function deleteTodo() {
    var index = prompt("What Index Would You Like To Delete?");
    todos.splice(index, 1);
    console.log("Deleted Todo");
  }


}, 500)
