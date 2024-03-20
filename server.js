const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


// View all departments
app.get('/departments', (req, res) => {
    connection.query('SELECT * FROM Departments', (err, results) => {
        if (err) {
            console.error('Error retrieving departments:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// View all roles
app.get('/roles', (req, res) => {
    connection.query('SELECT * FROM Roles', (err, results) => {
        if (err) {
            console.error('Error retrieving roles:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// View all employees
app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM Employees', (err, results) => {
        if (err) {
            console.error('Error retrieving employees:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Add a department
app.post('/departments', (req, res) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:'
        }
    ]).then((answers) => {
        const { departmentName } = answers;
        connection.query('INSERT INTO Departments (department_name) VALUES (?)', [departmentName], (err, result) => {
            if (err) {
                console.error('Error adding department:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Department added successfully');
        });
    });
});

// Add a role
app.post('/roles', (req, res) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for the role:'
        },
        {
            type: 'input',
            name: 'departmentId',
            message: 'Enter the department ID for the role:'
        }
    ]).then((answers) => {
        const { title, salary, departmentId } = answers;
        connection.query('INSERT INTO Roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId], (err, result) => {
            if (err) {
                console.error('Error adding role:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Role added successfully');
        });
    });
});

// Add an employee
app.post('/employees', (req, res) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the employee\'s first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the employee\'s last name:'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the role ID for the employee:'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'Enter the manager ID for the employee (if applicable):'
        }
    ]).then((answers) => {
        const { firstName, lastName, roleId, managerId } = answers;
        connection.query('INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId], (err, result) => {
            if (err) {
                console.error('Error adding employee:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(201).send('Employee added successfully');
        });
    });
});

// Update an employee role
app.put('/employees/:id/role', (req, res) => {
    const employeeId = req.params.id;
    inquirer.prompt([
        {
            type: 'input',
            name: 'roleId',
            message: 'Enter the new role ID for the employee:'
        }
    ]).then((answers) => {
        const { roleId } = answers;
        connection.query('UPDATE Employees SET role_id = ? WHERE employee_id = ?', [roleId, employeeId], (err, result) => {
            if (err) {
                console.error('Error updating employee role:', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.status(200).send('Employee role updated successfully');
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



