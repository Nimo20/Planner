SELECT
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    r.title AS job_title,
    d.name AS department_name,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM
    employees e
INNER JOIN
    roles r ON e.role_id = r.id
INNER JOIN
    departments d ON r.department_id = d.id
LEFT JOIN
    employees m ON e.manager_id = m.id;

SELECT
    r.id AS role_id,
    r.title AS job_title,
    d.name AS department_name,
    r.salary
FROM
    roles r
INNER JOIN
    departments d ON r.department_id = d.id;