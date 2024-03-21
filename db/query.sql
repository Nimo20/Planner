SELECT r.id AS role_id, r.title AS job_title, r.salary
FROM roles r
ORDER BY r.id;


SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM employees e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id
LEFT JOIN employees m ON e.manager_id = m.id;


SELECT d.id AS department_id, d.name AS department_name
FROM departments d
ORDER BY d.id;


SELECT d.name AS department, r.title AS job_title, e.id AS employee_id, e.first_name, e.last_name
FROM employees e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id
ORDER BY d.name;

SELECT CONCAT(m.first_name, ' ', m.last_name) AS manager, d.name AS department, e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN departments d ON r.department_id = d.id
WHERE e.manager_id IS NOT NULL
ORDER BY m.first_name, m.last_name;

SELECT r.title AS job_title, e.id AS employee_id, e.first_name, e.last_name, d.name AS department
FROM employees e
LEFT JOIN roles r ON e.role_id = r.id
LEFT JOIN departments d ON r.department_id = d.id
ORDER BY r.title;


SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id
INNER JOIN roles r ON e.role_id = r.id
INNER JOIN departments d ON r.department_id = d.id
ORDER BY e.id;

SELECT e.first_name, e.last_name, e.role_id
FROM employees e
WHERE e.id = 4;

SELECT d.name AS department_name, SUM(r.salary) AS total_budget
FROM departments d
JOIN roles r ON d.id = r.department_id
JOIN employees e ON r.id = e.role_id
GROUP BY d.name;