SELECT *
FROM employees
WHERE manager_id = manager_id_to_view;

SELECT *
FROM employees
JOIN departments ON employees.department_id = departments.department_id
WHERE departments.department_name = 'Department Name';

SELECT *
FROM employees
JOIN departments ON employees.department_id = departments.department_id
WHERE departments.department_name = 'Department Name';

DELETE FROM roles
WHERE role_id = role_to_delete_id;

DELETE FROM employees
WHERE employee_id = employee_to_delete_id;

SELECT departments.department_name, SUM(roles.salary) AS total_budget
FROM employees
JOIN roles ON employees.role_id = roles.role_id
JOIN departments ON employees.department_id = departments.department_id
WHERE departments.department_name = 'Department Name'
GROUP BY departments.department_name;