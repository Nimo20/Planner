const express = require('express');
const mysql = require('mysql2/promise'); // Import mysql2 with promise support
const inquirer = require('inquirer');

const app = express();
const PORT = process.env.PORT || 3000;

// Create MySQL connection using mysql2
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1413',
    database: 'employees'
});

// Function to handle queries using Promises
function queryPromise(sql, args) {
    return connection.execute(sql, args).then(([rows, fields]) => {
        return rows;
    }).catch((err) => {
        throw err;
    });
}


// Your route handlers using queryPromise function
// View all departments
app.get('/departments', async (req, res) => {
    try {
        const results = await queryPromise('SELECT * FROM Departments');
        res.json(results);
    } catch (err) {
        console.error('Error retrieving departments:', err);
        res.status(500).send('Internal Server Error');
    }
});

// View all roles
app.get('/roles', async (req, res) => {
    try {
        const results = await queryPromise('SELECT * FROM Roles');
        res.json(results);
    } catch (err) {
        console.error('Error retrieving roles:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a department
app.post('/departments', async (req, res) => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:'
            }
        ]);
        const { departmentName } = answers;

        const result = await queryPromise('INSERT INTO Departments (department_name) VALUES (?)', [departmentName]);
        res.status(201).send('Department added successfully');
    } catch (err) {
        console.error('Error adding department:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add a role
app.post('/roles', async (req, res) => {
    try {
        const answers = await inquirer.prompt([
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
        ]);

        const { title, salary, departmentId } = answers;

        const result = await queryPromise('INSERT INTO Roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);

        res.status(201).send('Role added successfully');
    } catch (err) {
        console.error('Error adding role:', err);
        res.status(500).send('Internal Server Error');
    }
})

// Add an employee
app.post('/employees', async (req, res) => {
    try {
        const answers = await inquirer.prompt([
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
        ]);

        const { firstName, lastName, roleId, managerId } = answers;

        const result = await queryPromise('INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);

        res.status(201).send('Employee added successfully');
    } catch (err) {
        console.error('Error adding employee:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Add your route handlers here
// Update an employee
app.put('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the updated first name of the employee:'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the updated last name of the employee:'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'Enter the updated role ID for the employee:'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the updated manager ID for the employee (if applicable):'
            }
        ]);

        const { firstName, lastName, roleId, managerId } = answers;

        const result = await queryPromise('UPDATE Employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?', [firstName, lastName, roleId, managerId, employeeId]);

        res.status(200).send('Employee updated successfully');
    } catch (err) {
        console.error('Error updating employee:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
    const employeeId = req.params.id;
    try {
        // Execute query to delete employee based on employeeId using queryPromise
        res.status(200).send('Employee deleted successfully');
    } catch (err) {
        console.error('Error deleting employee:', err);
        res.status(500).send('Internal Server Error');
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




