require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "//enter your SQL password here!!!!",
    database: "employee_tracker_db"
});

db.connect(function(err) {
    if (err) throw err;

    console.log("Connected to Employee Tracker Database!");
    employeeTrackerDB();
});

function employeeTrackerDB() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add A Department',
                'Add A Role',
                'Add An Employee',
                'Update An Employee',
                'Exit'

            ]
        }
    ]).then(function(answers) {
        switch (answers.action) {
            case "View All Departments":
                viewAllDepts();
            break;
            case "View All Roles":
                viewAllRoles();
            break;
            case "View All Employees":
                viewAllEmployees();
            break;
            case "Add A Department":
                addDepartment();
            break;
            case "Add A Role":
                addRole();
            break;
            case "Add An Employee":
                addEmployee();
            break;
            case "Update An Employee":
                updateEmployee();
            break;
            case "Exit":
                console.log("GOODBYE!");
                db.end();
            break;
        }
    })
};

function viewAllDepts() {
    db.query("SELECT department.id AS ID, department.dept_name AS Department FROM department",
    function(err, res) {
        if(err) throw err;
        console.log("DEPARTMENTS");
        console.table(res);
        employeeTrackerDB();
    });
};

// job title, role id, department, & salary
function viewAllRoles() {
    db.query("SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, department.dept_name AS Department FROM roles LEFT JOIN department ON department.id = roles.dept_id",
    function(err, res) {
        if(err) throw err;
        console.log("ROLES");
        console.table(res);
        employeeTrackerDB();
    });
};

function viewAllEmployees() {
    db.query("SELECT employees.id AS ID, employees.first_name as First_Name, employees.last_name as Last_Name, roles.title AS Title, roles.salary AS Salary, department.dept_name AS Department, employees.manager_id AS Manager FROM employees INNER JOIN roles ON roles.id = employees.role_id INNER JOIN department on department.id = roles.dept_id;",
    function(err, res) {
        if (err) throw err;
        console.log('EMPLOYEE LIST');
        console.table(res);
        employeeTrackerDB();
    })
};

let managerArray = [];
function selectManager() {
    db.query('SELECT first_name, last_name FROM employees',
    function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            managerArray.push(res[i].first_name);
        }
    })
    return managerArray;
};

let roleArray = [];
function selectRole() {
    db.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleArray.push(res[i].title);
        }
    })
    return roleArray;
};

let departmentArray = [];
function selectDept() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentArray.push(res[i].dept_name);
        }
    })
    return departmentArray;
}

function addDepartment() {
    inquirer.prompt([
        {
        name: 'name',
        type: 'input',
        message: 'What Department would you like to add?'
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the new Department ID number?'
        }

    ]).then(function(answers) {
        db.query('INSERT INTO department SET ?',
        {
            dept_name: answers.name,
            id: answers.id
        },
        function(err, res) {
            if (err) throw err;
            viewAllDepts();
            employeeTrackerDB();
        })
    
    })
};

function addRole() {
    db.query('SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.dept_name AS Department FROM department;', function(err, res) {
        inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the name of this new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this new role?'
            },
            {
                name: 'departmentId',
                type: 'input',
                message: 'Enter Department ID for this new role'
            }
        ]).then(function(answers) {
            db.query('INSERT INTO roles SET ?', 
            {
                title: answers.title,
                salary: answers.salary,
                dept_id: answers.departmentId,
            },
            function(err, res) {
                if(err) throw err;
                console.table(res);
                employeeTrackerDB();
            })
        });
    });
};

function addEmployee() {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: "What is employee's first name?"
        },
        {
            name: 'lastName',
            type: 'input',
            message: "What is employee's last name?"
        },
        {
            name: 'role',
            type: 'list',
            message: "What is the new employee's role?",
            choices: selectRole()
        },
        {
            name: 'managerId',
            type: 'list',
            message: "Who is managing the new employee?",
            choices: selectManager()
        }
    ]).then(function (answers) {
        let roleId = selectRole().indexOf(answers.role) + 1;
        let managerId = selectManager().indexOf(answers.choice) + 1;
        db.query("INSERT INTO employees SET ?", 
        {
            first_name: answers.firstName,
            last_name: answers.lastName,
            role_id: roleId,
            manager_id: managerId,

        },
        function(err){
            if(err) throw err;
            console.table(answers);
            employeeTrackerDB();
        })
    })
};

function updateEmployee() {
    db.query('SELECT * from roles',
    function(err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                name: 'employeeID',
                type: 'input',
                message: "What is the employee's ID?",
            },
            {
                name: 'newRole',
                type: 'input',
                message: "What is the ID for the employee's new role?",
            }

        ]).then(function(answers) {
            db.query('UPDATE employees SET ? WHERE ?',
            [
                {
                    role_id: answers.newRole
                },
                {
                    id: answers.employeeID
                }
            ],
            function(err) {
                if (err) throw err;
                viewAllEmployees();
                employeeTrackerDB();
            });
        });
});
};
