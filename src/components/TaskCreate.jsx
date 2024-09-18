import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs

const TaskCreate = ({ addTask, initialTask }) => {
  const [taskName, setTaskName] = useState('');
  const [taskStatus, setTaskStatus] = useState('pending');

  useEffect(() => {
    if (initialTask) {
      setTaskName(initialTask.name);
      setTaskStatus(initialTask.status);
    }
  }, [initialTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName) return; // Prevent adding empty tasks

    const newTask = {
      id: initialTask ? initialTask.id : uuidv4(), // Use uuid for generating new ID
      name: taskName,
      status: taskStatus,
    };
    addTask(newTask);
    setTaskName('');
    setTaskStatus('pending'); // Reset status to default
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" disabled={!taskName}>
        {initialTask ? 'Save Changes' : 'Add Task'}
      </Button>
    </form>
  );
};

export default TaskCreate;
