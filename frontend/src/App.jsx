import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [designation, setDesignation] = useState("Developer");
  const [basicSalary, setBasicSalary] = useState("");
  const [city, setCity] = useState("Gudur");
  const [presentDays, setPresentDays] = useState("");
  const [result, setResult] = useState(null);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/employees");
      const data = await response.json();
      if (Array.isArray(data)) {
        setEmployees(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employee = {
      id: id,
      name: name,
      designation: designation,
      basic_salary: basicSalary,
      city: city,
      present_days: presentDays,
    };

    const response = await fetch("http://localhost:5000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
    const data = await response.json();
    setResult(data);
    loadEmployees();
  };

  return (
    <div>
      <h1>Employee Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID: </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Designation: </label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="Developer">Developer</option>
            <option value="Tester">Tester</option>
            <option value="TeamLead">TeamLead</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <br />
        <div>
          <label>Basic Salary: </label>
          <input
            type="number"
            value={basicSalary}
            onChange={(e) => setBasicSalary(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>City: </label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="Gudur">Gudur</option>
            <option value="Nellore">Nellore</option>
            <option value="Kota">Kota</option>
            <option value="Naidupeta">Naidupeta</option>
          </select>
        </div>
        <br />
        <div>
          <label>Present Days: </label>
          <input
            type="number"
            value={presentDays}
            onChange={(e) => setPresentDays(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Result</h2>
          <p>Message: {result.message}</p>
          <p>Name: {result.name}</p>
          <p>Total Salary: {result.total_salary}</p>
          <p>Bus Fees: {result.bus_fees}</p>
        </div>
      )}

      <hr />
      <h2>Employee Records</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Basic</th>
            <th>City</th>
            <th>Days</th>
            <th>PF</th>
            <th>HRA</th>
            <th>DA</th>
            <th>Total Salary</th>
            <th>Bus Fees</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.designation}</td>
              <td>{emp.basic_salary}</td>
              <td>{emp.city}</td>
              <td>{emp.present_days}</td>
              <td>{emp.pf}</td>
              <td>{emp.hra}</td>
              <td>{emp.da}</td>
              <td>{emp.total_salary}</td>
              <td>{emp.bus_fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
