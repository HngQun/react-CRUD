import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import './EmployeeList.css';
import EmployeeEditForm from "./EmployeeEditForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    // Fetch employees from the API
    axios
      .get("http://127.0.0.1:8000/api/employees/")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleDelete = (employeeId) => {
    // Delete an employee
    axios
      .delete(`http://127.0.0.1:8000/api/employees/${employeeId}`)
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.EMP_ID !== employeeId)
        );
      })
      .catch((error) => {
        console.error("Error deleting employee: ", error);
      });
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleEditClose = () => {
    setEditEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    // Update the employee information
    axios
      .put(
        `http://127.0.0.1:8000/api/employees/${updatedEmployee.EMP_ID}`,
        updatedEmployee
      )
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee.id === updatedEmployee.EMP_ID ? updatedEmployee : employee
          )
        );
        handleEditClose();
      })
      .catch((error) => {
        console.error("Error updating employee: ", error);
      });
  };

  return (
    <div className="container">
      <Typography variant="h5">Employee List</Typography>
      <TableContainer component={Paper} className="tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.EMP_ID}>
                <TableCell>{employee.Name}</TableCell>
                <TableCell>{employee.Email}</TableCell>
                <TableCell>{employee.Phone}</TableCell>
                <TableCell>{employee.Address}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(employee)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(employee.EMP_ID)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Employee Dialog */}
      <Dialog open={Boolean(editEmployee)} onClose={handleEditClose}>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {editEmployee && (
            <EmployeeEditForm
              employee={editEmployee}
              onUpdateEmployee={handleUpdateEmployee}
              onClose={handleEditClose}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
