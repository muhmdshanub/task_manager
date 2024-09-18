import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList'; // Component to list and manage tasks
import TaskFilter from '../components/TaskFilter';
import { Container, Box, Paper, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import TaskCreate from '../components/TaskCreate'; // Component to create tasks

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks from localStorage on component mount
    const loadTasks = () => {
      const savedTasks = JSON.parse(localStorage.getItem('my_task_list')) || [];
      setTasks(savedTasks);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      // Save tasks to localStorage whenever tasks change
      localStorage.setItem('my_task_list', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, task]);
    setOpen(false);
  };

  // Edit an existing task
  const editTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setEditingTask(task);
    setOpen(true);
  };

  // Save changes to an existing task
  const saveTask = (updatedTask) => {
    if (!updatedTask.name) return; // Prevent saving empty tasks
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setOpen(false);
    setEditingTask(null);
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Mark a task as complete or pending
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  // Filter tasks based on the filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <Container maxWidth="sm" sx={{ paddingY: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#42a5f5', color: '#fff', '&:hover': { backgroundColor: '#1e88e5' } }}
          onClick={() => { setEditingTask(null); setOpen(true); }}
          fullWidth
        >
          Add New Task
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#90caf9' , display: 'flex', justifyContent: 'center'}}>
          <TaskFilter filter={filter} setFilter={setFilter} />
        </Paper>
      </Box>

      <Box>
        <Paper elevation={2} sx={{ padding: 2, backgroundColor: '#ffffff', maxHeight: '400px', overflowY: 'auto' }}>
          {filteredTasks.length === 0 ? (
            <Typography variant="h6" color="textSecondary" align="center">
              No tasks available
            </Typography>
          ) : (
            <TaskList
              tasks={filteredTasks}
              editTask={editTask}
              deleteTask={deleteTask}
              toggleTaskStatus={toggleTaskStatus}
            />
          )}
        </Paper>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ backgroundColor: '#64b5f6', color: '#fff' }}>{editingTask ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TaskCreate
            addTask={editingTask ? saveTask : addTask}
            initialTask={editingTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TaskScreen;
