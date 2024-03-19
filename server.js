const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = 3000;

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

// Define API endpoints

// Get all departments
app.get('/departments', (req, res) => {
    const query = "SELECT * FROM departments";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Get all roles
app.get('/roles', (req, res) => {
    const query = `
        SELECT roles.id, roles.title, roles.salary, departments.name AS department
        FROM roles
        INNER JOIN departments ON roles.department_id = departments.id
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching roles:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Get all employees
app.get('/employees', (req, res) => {
    const query = `
        SELECT employees.id, employees.first_name, employees.last_name,
               roles.title AS job_title, departments.name AS department,
               roles.salary, CONCAT(managers.first_name, ' ', managers.last_name) AS manager
        FROM employees
        INNER JOIN roles ON employees.role_id = roles.id
        INNER JOIN departments ON roles.department_id = departments.id
        LEFT JOIN employees AS managers ON employees.manager_id = managers.id
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching employees:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

// Add a department
app.post('/departments', (req, res) => {
    const { name } = req.body;
    const query = "INSERT INTO departments (name) VALUES (?)";
    connection.query(query, [name], (err, results) => {
        if (err) {
            console.error('Error adding department:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Department added successfully' });
    });
});

// Add a role
app.post('/roles', (req, res) => {
    const { title, salary, department_id } = req.body;
    const query = "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)";
    connection.query(query, [title, salary, department_id], (err, results) => {
        if (err) {
            console.error('Error adding role:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Role added successfully' });
    });
});

// Add an employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, role_id, manager_id } = req.body;
    const query = "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    connection.query(query, [first_name, last_name, role_id, manager_id], (err, results) => {
        if (err) {
            console.error('Error adding employee:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(201).json({ message: 'Employee added successfully' });
    });
});

// Update an employee role
app.put('/employees/:id/role', (req, res) => {
    const { id } = req.params;
    const { role_id } = req.body;
    const query = "UPDATE employees SET role_id = ? WHERE id = ?";
    connection.query(query, [role_id, id], (err, results) => {
        if (err) {
            console.error('Error updating employee role:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.status(200).json({ message: 'Employee role updated successfully' });
    });
});

// Seed the database with sample data
const seedDataQuery = `
    -- Insert seed data for Departments, Roles, and Employees here
`;

connection.query(seedDataQuery, (err, results) => {
    if (err) {
        console.error('Error seeding database:', err);
        return;
    }
    console.log('Database seeded with sample data');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



