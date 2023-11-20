import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from "axios";
import "./EmployeeEditForm.css"

const EmployeeEditForm = ({ employee, onUpdateEmployee, onClose }) => {
  const [editedEmployee, setEditedEmployee] = useState({});

  useEffect(() => {
    // Set initial values when the component mounts
    setEditedEmployee(employee);
  }, [employee]);

  const handleInputChange = (e) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    // Update the employee information
    axios.put(`http://127.0.0.1:8000/api/employees/${editedEmployee.EMP_ID}`, editedEmployee)
      .then((response) => {
        console.log('Employee updated successfully:', response.data);
        onUpdateEmployee(response.data);
        onClose();
        // Reload the page after adding an employee
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error updating employee: ', error);
      });
  };

  return (
    <div className="formContainer">
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        name="Name"
        value={editedEmployee.Name || ''}
        onChange={handleInputChange}
        className="textField"
      />
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        name="Email"
        value={editedEmployee.Email || ''}
        onChange={handleInputChange}
        className="textField"
      />
      <TextField
        label="Phone"
        variant="outlined"
        fullWidth
        name="Phone"
        value={editedEmployee.Phone || ''}
        onChange={handleInputChange}
        className="textField"
      />
      <TextField
        label="Address"
        variant="outlined"
        fullWidth
        name="Address"
        value={editedEmployee.Address || ''}
        onChange={handleInputChange}
        className="textField"
      />
      {/* Add more fields as needed */}
      <Button color="primary" onClick={handleUpdate}>
        Update
      </Button>
      <Button color="secondary" onClick={onClose}>
        Cancel
      </Button>
    </div>
  );
};

export default EmployeeEditForm;
