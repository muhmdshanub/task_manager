import React from 'react';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const TaskList = ({ tasks, deleteTask, editTask, toggleTaskStatus }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ maxHeight: '400px', overflowY: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Task Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => (
            <TableRow
              key={task.id}
              sx={{
                backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9', // Alternating row colors
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{task.name}</TableCell>
              <TableCell>
                <Chip
                  label={task.status}
                  color={task.status === 'completed' ? 'success' : 'default'}
                />
                {task.status === 'pending' && (
                  <Tooltip title="Mark as Complete">
                    <IconButton
                      onClick={() => toggleTaskStatus(task.id)}
                      color="success"
                      sx={{ ml: 1 }}
                    >
                      <CheckIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton onClick={() => editTask(task.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => deleteTask(task.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
