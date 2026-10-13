CREATE DATABASE IF NOT EXISTS employeedb;
USE employeedb;

CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100),
    designation VARCHAR(50),
    basic_salary DECIMAL(10, 2),
    city VARCHAR(50),
    present_days INT,
    pf DECIMAL(10, 2),
    hra DECIMAL(10, 2),
    da DECIMAL(10, 2),
    total_salary DECIMAL(10, 2),
    bus_fees DECIMAL(10, 2)
);
