import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import './App.css'
import StudentList from './StudentList'; // To be created
import AddStudentModal from './AddStudentModal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [students, setStudents] = useState(() => {
    const stored = localStorage.getItem('students');
    return stored ? JSON.parse(stored) : [];
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Save students to localStorage on change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = (student) => {
    if (editingStudent) {
      setStudents((prev) => prev.map((s) => (s.id === editingStudent.id ? { ...student, id: editingStudent.id } : s)));
      setEditingStudent(null);
    } else {
      setStudents((prev) => [...prev, { ...student, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingStudent(null);
    setModalOpen(true);
  };

  const handleDeleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  // Helper wrappers for StudentList to extract params
  const StudentListAll = () => <StudentList students={students} onDelete={handleDeleteStudent} onEdit={handleEditStudent} />;
  const StudentListByCategory = () => {
    const { category } = useParams();
    return <StudentList students={students} filterCategory={category} onDelete={handleDeleteStudent} onEdit={handleEditStudent} />;
  };
  const StudentListByCategoryLevel = () => {
    const { category, level } = useParams();
    return <StudentList students={students} filterCategory={category} filterLevel={level} onDelete={handleDeleteStudent} onEdit={handleEditStudent} />;
  };
  const StudentListByLevel = () => {
    const { level } = useParams();
    // Try to get category from query or context if needed
    return <StudentList students={students} filterLevel={level} onDelete={handleDeleteStudent} onEdit={handleEditStudent} />;
  };

  const kidsLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
  const adultsLevels = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1'];
  const kidsLevelCounts = kidsLevels.map(level => ({
    level,
    count: students.filter(s => s.category === 'Kids' && s.level === level).length
  }));
  const adultsLevelCounts = adultsLevels.map(level => ({
    level,
    count: students.filter(s => s.category === 'Adults' && s.level === level).length
  }));
  const totalKids = students.filter(s => s.category === 'Kids').length;
  const totalAdults = students.filter(s => s.category === 'Adults').length;

  return (
    <Router>
      <NavBar />
      <div className="main-container">
        {/* Student counter */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, flexWrap: 'nowrap', gap: 6, overflowX: 'hidden', whiteSpace: 'nowrap' }}>
          <h2 style={{ flex: 1, margin: 0, fontSize: 20, minWidth: 80 }}>Students</h2>
          <span style={{ fontSize: 14, color: '#1976d2', fontWeight: 500, marginRight: 8, flexShrink: 0 }}>Total: {students.length}</span>
          <span style={{ fontSize: 13, color: '#388e3c', fontWeight: 500, marginRight: 6, flexShrink: 0 }}>Kids: {totalKids}</span>
          <span style={{ fontSize: 13, color: '#1976d2', fontWeight: 500, marginRight: 8, flexShrink: 0 }}>Adults: {totalAdults}</span>
          <span style={{ fontWeight: 500, color: '#1976d2', marginRight: 6, fontSize: 13 }}>Kids:</span>
          {kidsLevelCounts.map(lc => (
            <span key={lc.level} style={{ fontSize: 12, color: '#555', background: '#f0f2f5', borderRadius: 8, padding: '1px 7px', marginRight: 2, flexShrink: 0 }}>
              {lc.level}: {lc.count}
            </span>
          ))}
          <span style={{ fontWeight: 500, color: '#1976d2', marginRight: 6, marginLeft: 8, fontSize: 13 }}>Adults:</span>
          {adultsLevelCounts.map(lc => (
            <span key={lc.level} style={{ fontSize: 12, color: '#555', background: '#f0f2f5', borderRadius: 8, padding: '1px 7px', marginRight: 2, flexShrink: 0 }}>
              {lc.level}: {lc.count}
            </span>
          ))}
        </div>
        <Routes>
          <Route path="/" element={<StudentListAll />} />
          <Route path="/category/:category" element={<StudentListByCategory />} />
          <Route path="/category/:category/level/:level" element={<StudentListByCategoryLevel />} />
          <Route path="/level/:level" element={<StudentListByLevel />} />
        </Routes>
      </div>
      <AddStudentModal
        onAdd={handleAddStudent}
        open={modalOpen}
        setOpen={setModalOpen}
        editingStudent={editingStudent}
      />
      {/* Floating Material UI Fab for add */}
      {!modalOpen && (
        <Fab color="primary" aria-label="add" onClick={handleOpenAddModal} style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1300 }}>
          <AddIcon />
        </Fab>
      )}
    </Router>
  );
}

export default App
