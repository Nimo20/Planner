SELECT
    employee_id,
    first_name,
    last_name,
    title AS job_title,
    department_name,
    salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM
    Employees
INNER JOIN
    Roles  ON role_id = role_id
INNER JOIN
    Departments  ON department_id = department_id
LEFT JOIN
    Employees  ON manager_id = employee_id;

SELECT
    role_id,
    title AS job_title,
    department_name,
    salary
FROM
    Roles 
INNER JOIN
    Departments ON r.department_id = department_id;