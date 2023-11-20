import React, { useState } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeAddForm from './components/EmployeeAddForm';

function App() {
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  return (
    <div>
      <h1>Employee Management System</h1>
      <EmployeeAddForm onAddEmployee={handleAddEmployee} />
      <EmployeeList employees={employees} />
      <br/>
    </div>
  );
}

export default App;
