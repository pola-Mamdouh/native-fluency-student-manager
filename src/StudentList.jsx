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
        <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Name</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Phone</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Level</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Category</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Fees</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Duration</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Start Date</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>End Date</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Email</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Address</TableCell>
                <TableCell sx={{ fontSize: { xs: 11, sm: 14 }, px: { xs: 0.5, sm: 2 } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((student) => (
                <TableRow key={student.id}>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.name}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.phone}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.level}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.category}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.fees}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.duration}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.startDate ? new Date(student.startDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.endDate ? new Date(student.endDate).toLocaleDateString() : ''}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.email}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>{student.address}</TableCell>
                  <TableCell sx={{ fontSize: { xs: 11, sm: 13 }, px: { xs: 0.5, sm: 2 } }}>
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