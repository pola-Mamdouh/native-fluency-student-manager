import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import DynamicSelect from './DynamicSelect';

const kidsLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
const adultsLevels = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1'];
const categories = ['Kids', 'Adults'];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function AddStudentModal({ onAdd, open, setOpen, editingStudent }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    level: '',
    category: '',
    fees: '',
    duration: '',
    startDate: null,
    endDate: null,
    email: '',
    address: '',
  });

  useEffect(() => {
    if (editingStudent) {
      setForm({ ...editingStudent });
    } else {
      setForm({
        name: '',
        phone: '',
        level: '',
        category: '',
        fees: '',
        duration: '',
        startDate: null,
        endDate: null,
        email: '',
        address: '',
      });
    }
  }, [editingStudent, open]);

  const levelOptions = form.category === 'Kids' ? kidsLevels : form.category === 'Adults' ? adultsLevels : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setForm({ ...form, category: value, level: '' }); // Reset level if category changes
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)} style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}>
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Student Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <DynamicSelect
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={categories}
              required
            />
            <DynamicSelect
              label="Level"
              name="level"
              value={form.level}
              onChange={handleChange}
              options={levelOptions}
              required
              disabled={!form.category}
            />
            <TextField
              label="Tuition Fees"
              name="fees"
              value={form.fees}
              onChange={handleChange}
              type="number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Course Duration"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={form.startDate}
                onChange={(date) => setForm({ ...form, startDate: date })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
              <DatePicker
                label="End Date"
                value={form.endDate}
                onChange={(date) => setForm({ ...form, endDate: date })}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
              />
            </LocalizationProvider>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
              multiline
              minRows={2}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={() => setOpen(false)} color="secondary" sx={{ mr: 1 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {editingStudent ? 'Update Student' : 'Add Student'}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
} 