import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import axios from 'axios';
import "./EmployeeAddForm.css"

const EmployeeForm = ({ onAddEmployee }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Address: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clear form data when closing the dialog
    setFormData({
      Name: '',
      Email: '',
      Phone: '',
      Address: '',
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    // Create a new employee
    axios.post('http://127.0.0.1:8000/api/employees/', formData)
      .then((response) => {
        console.log('Employee added successfully:', response.data);
        onAddEmployee(response.data); // Notify the parent component
        handleClose();
        // Reload the page after adding an employee
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding employee: ', error);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen} className="addButton">
        Add Employee
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="Name"
            value={formData.Name}
            onChange={handleInputChange}
            className='textField'
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="Email"
            value={formData.Email}
            onChange={handleInputChange}
            className='textField'
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            name="Phone"
            value={formData.Phone}
            onChange={handleInputChange}
            className='textField'
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            name="Address"
            value={formData.Address}
            onChange={handleInputChange}
            className='textField'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeForm;
