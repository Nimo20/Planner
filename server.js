const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
require('console.table');

const promptMessages = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View All Employees By Department",
    viewByManager: "View All Employees By Manager",
    addEmployee: "Add An Employee",
    removeEmployee: "Remove An Employee",
    updateRole: "Update Employee Role",
    viewAllRoles: "View All Roles",
    exit: "Exit"
};

async function initializeServer() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1413',
            database: 'employees'
        });

        async function prompt() {
            try {
                const { action } = await inquirer.prompt({
                    name: 'action',
                    type: 'list',
                    message: 'What would you like to do?',
                    choices: [
                        promptMessages.viewAllEmployees,
                        promptMessages.viewByDepartment,
                        promptMessages.viewByManager,
                        promptMessages.viewAllRoles,
                        promptMessages.addEmployee,
                        promptMessages.removeEmployee,
                        promptMessages.updateRole,
                        promptMessages.exit
                    ]
                });

                switch (action) {
                    case promptMessages.viewAllEmployees:
                        await viewAllEmployees();
                        break;
                    case promptMessages.viewByDepartment:
                        await viewByDepartment();
                        break;
                    case promptMessages.viewByManager:
                        await viewByManager();
                        break;
                    case promptMessages.addEmployee:
                        await addEmployee();
                        break;
                    case promptMessages.removeEmployee:
                        await removeEmployee();
                        break;
                    case promptMessages.updateRole:
                        await updateRole();
                        break;
                    case promptMessages.viewAllRoles:
                        await viewAllRoles();
                        break;
                    case promptMessages.exit:
                        await connection.end();
                        process.exit();
                        break;
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }

        async function viewAllEmployees() {
            const [rows] = await connection.execute(`SELECT * FROM Employees`);
            console.table(rows);
            await prompt();
        }

        async function viewByDepartment() {
            const [rows] = await connection.execute(`
                SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department
                FROM employees e
                INNER JOIN roles r ON e.role_id = r.id
                INNER JOIN departments d ON r.department_id = d.id
                ORDER BY d.name
            `);
            console.table(rows);
            await prompt();
        }

        async function viewByManager() {
            const [rows] = await connection.execute(`SELECT * FROM employees ORDER BY manager_id`);
            console.table(rows);
            await prompt();
        }

        async function viewAllRoles() {
            try {
                // Fetch all roles from the database
                const [roles] = await connection.execute('SELECT * FROM roles');

                // Display the list of roles
                console.log('All Roles:');
                roles.forEach(role => {
                    console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
                });
            } catch (error) {
                console.error('Error fetching roles:', error);
            }

            await prompt();
        }

        // add employee
        async function addEmployee() {
            try {

                const [roles] = await connection.execute('SELECT id, title FROM roles');

                const roleChoices = roles.map(role => ({
                    name: `${role.title} (ID: ${role.id})`,
                    value: role.id
                }));

                const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                    {
                        name: 'firstName',
                        type: 'input',
                        message: 'Enter the employee\'s first name:'
                    },
                    {
                        name: 'lastName',
                        type: 'input',
                        message: 'Enter the employee\'s last name:'
                    },
                    {
                        name: 'roleId',
                        type: 'list',
                        message: 'Select the role for the employee:',
                        choices: roleChoices
                    },
                    {
                        name: 'managerId',
                        type: 'input',
                        message: 'Enter the manager ID for the employee (if applicable):'
                    }
                ]);

                console.log('Employee added successfully');
            } catch (error) {
                console.error('Error adding employee:', error);
            }

            await prompt();
        }

        // remove employee

        async function removeEmployee() {
            const { id } = await inquirer.prompt({
                name: 'id',
                type: 'input',
                message: 'Enter the employee ID to remove:'
            });

            const employeeIdValue = parseInt(id);

            if (isNaN(employeeIdValue)) {
                console.log('Invalid employee ID. Please provide a valid integer value.');
                return;
            }

            try {

                await connection.execute('UPDATE employees SET manager_id = NULL WHERE manager_id = ?', [employeeIdValue]);


                await connection.execute('DELETE FROM employees WHERE id = ?', [employeeIdValue]);
                console.log('Employee removed successfully');
            } catch (error) {
                console.error('Error removing employee:', error);
            }

            await prompt();
        }
        // update role
        async function updateRole() {
            try {
                const [roles] = await connection.execute('SELECT id, title FROM roles');

                const roleChoices = roles.map(role => ({
                    name: `${role.title} (ID: ${role.id})`,
                    value: role.id
                }));

                const { employeeId, roleId } = await inquirer.prompt([
                    {
                        name: 'employeeId',
                        type: 'input',
                        message: 'Enter the employee ID to update role:'
                    },
                    {
                        name: 'roleId',
                        type: 'list',
                        message: 'Select the new role for the employee:',
                        choices: roleChoices
                    }
                ]);

                try {
                    await connection.execute('UPDATE Employees SET role_id = ? WHERE id = ?', [roleId, employeeId]);
                    console.log('Employee role updated successfully');
                } catch (error) {
                    console.error('Error updating employee role:', error);
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }

            await prompt();
        }

        await prompt();
    } catch (error) {
        console.error('Error initializing server:', error);
    }
}

//  the initializeServer function
initializeServer();
