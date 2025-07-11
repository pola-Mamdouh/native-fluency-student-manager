import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export default function StudentList({ students, filterCategory, filterLevel, onDelete, onEdit }) {
  const [deleteId, setDeleteId] = useState(null);

  let filtered = students;
  if (filterCategory) {
    filtered = filtered.filter((s) => s.category.toLowerCase() === filterCategory.toLowerCase());
  }
  if (filterLevel) {
    filtered = filtered.filter((s) => s.level === filterLevel);
  }

  const handleDelete = (id) => {
    setDeleteId(id);
  };
  const handleConfirmDelete = () => {
    if (onDelete && deleteId) onDelete(deleteId);
    setDeleteId(null);
  };
  const handleCancelDelete = () => setDeleteId(null);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {filterCategory && filterLevel ? `Category: ${filterCategory}, Level: ${filterLevel}` :
         filterCategory ? `Category: ${filterCategory}` :
         filterLevel ? `Level: ${filterLevel}` :
         'All Students'}
      </Typography>
      {filtered.length === 0 ? (
        <Typography>No students found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Level</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Fees</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.level}</TableCell>
                  <TableCell>{student.category}</TableCell>
                  <TableCell>{student.fees}</TableCell>
                  <TableCell>{student.duration}</TableCell>
                  <TableCell>{student.startDate ? new Date(student.startDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{student.endDate ? new Date(student.endDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit && onEdit(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(student.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={!!deleteId} onClose={handleCancelDelete}>
        <DialogTitle>Delete Student</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this student?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 