const inquirer = require("inquirer");

function mustNotBeEmpty(str, fieldName) {
  if (str === "") {
    return `${fieldName} cannot be empty.`;
  }
  return true;
}

function welcomeScreen() {
  return inquirer.prompt([
    {
      type: "list",
      name: "welcome",
      message:
        "Welcome! This application allows to view, add, update and edit departments, roles, employees. Press continue to proceed?",
      choices: ["Continue", "Exit"],
    },
  ]);
}

function handleExit(data) {
  if (data.welcome === "Exit") {
    process.exit(0);
  }
}

const choices = {
  viewAll: "View all Employees",
  viewAllByDepartment: "View All Employees By Department",
  vielAllByManager: "View All Employees By Manager",
  addEmployee: "Add Employee",
  removeEmployee: "Remove Employee",
  updateEmployee: "Update Employee Role",
  updateEmployeeManager: "Update Employee Manager",
};

function runSearch(connection) {
  inquirer
    .prompt({
      type: "rawlist",
      name: "prompts",
      message: "What would you like to do?",
      choices: Object.values(choices),
      // choices: ["View all Employees", "View All Employees By Department"],
    })
    .then(function (answer) {
      switch (answer.action) {
        case choices.viewAll:
          employeeSearch();
          break;

        case choices.viewAllByDepartment:
          employeesByDepartment();
          break;

        case choices.vielAllByManager:
          employeesByManager();
          break;

        case choices.addEmployee:
          addEmployee();
          break;

        case choices.removeEmployee:
          removeEmployee();
          break;

        case choices.updateEmployee:
          updateEmployee();
          break;

        case choices.updateEmployeeManager:
          updateEmployeeManager();
          break;
      }
    });
}

//function to initialize the program
function init(connection) {
  return welcomeScreen()
    .then(handleExit)
    .then(() => runSearch(connection));
}

module.exports = {
  runSearch: runSearch,
  welcomeScreen: welcomeScreen,
  init: init,
};
