SELECT 
    e.employee_id,
    e.first_name,
    e.last_name,
    r.title AS job_title,
    d.department_name,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name
FROM 
    employee e
INNER JOIN 
    role r ON e.role_id = r.role_id
INNER JOIN 
    department d ON r.department_id = d.department_id
LEFT JOIN 
    employee m ON e.manager_id = m.employee_id;

 SELECT 
    r.role_id,
    r.title AS job_title,
    d.department_name,
    r.salary
FROM 
    role r
INNER JOIN 
    department d ON r.department_id = d.department_id;