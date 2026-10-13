const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeedb",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("MySQL connected");
  }
});

const RATES = {
  Developer: { pf: 6, hra: 10, da: 40 },
  Tester: { pf: 6, hra: 10, da: 35 },
  TeamLead: { pf: 8, hra: 15, da: 50 },
  Manager: { pf: 8, hra: 20, da: 60 },
};

const BUS_FEES = {
  Gudur: 10000,
  Nellore: 20000,
  Kota: 6000,
  Naidupeta: 15000,
};

app.post("/employees", (req, res) => {
  const { id, name, designation, basic_salary, city, present_days } = req.body;

  const rate = RATES[designation] || { pf: 0, hra: 0, da: 0 };
  const basic = Number(basic_salary);
  const days = Number(present_days);

  const pf = (basic * rate.pf) / 100;
  const hra = (basic * rate.hra) / 100;
  const da = (basic * rate.da) / 100;
  const monthSalary = basic + hra + da - pf;
  const total_salary = Math.round((monthSalary / 30) * days);
  const bus_fees = BUS_FEES[city] || 0;

  const sql = `
    INSERT INTO employees (id, name, designation, basic_salary, city, present_days, pf, hra, da, total_salary, bus_fees)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [id, name, designation, basic, city, days, pf, hra, da, total_salary, bus_fees],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Employee saved successfully",
        id: id,
        name: name,
        designation: designation,
        basic_salary: basic,
        city: city,
        present_days: days,
        pf: pf,
        hra: hra,
        da: da,
        total_salary: total_salary,
        bus_fees: bus_fees,
      });
    }
  );
});

app.get("/employees", (req, res) => {
  const sql = "SELECT * FROM employees";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
