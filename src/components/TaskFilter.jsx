import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <ButtonGroup variant="contained" aria-label="task filter buttons">
      <Button
        onClick={() => setFilter('all')}
        color={filter === 'all' ? 'primary' : 'inherit'}
      >
        All
      </Button>
      <Button
        onClick={() => setFilter('completed')}
        color={filter === 'completed' ? 'primary' : 'inherit'}
      >
        Completed
      </Button>
      <Button
        onClick={() => setFilter('pending')}
        color={filter === 'pending' ? 'primary' : 'inherit'}
      >
        Pending
      </Button>
    </ButtonGroup>
  );
};

export default TaskFilter;
