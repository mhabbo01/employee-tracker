DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;


USE employee_tracker_db;


CREATE TABLE department (

    id INTEGER AUTO_INCREMENT PRIMARY KEY,
   
    dept_name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (

    id INTEGER AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(30) NOT NULL,
  
    salary DECIMAL NOT NULL,

    dept_id INTEGER NOT NULL,
    
    FOREIGN KEY (dept_id) REFERENCES department(id)
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
  
    first_name VARCHAR(30) NOT NULL,
  
    last_name VARCHAR(30) NOT NULL,

    role_id INTEGER NOT NULL,

    manager_id INTEGER,
   
    FOREIGN KEY (role_id) REFERENCES roles(id)
);