// utils/taskStorage.js

const TASK_STORAGE_KEY = 'my_task_list';

/**
 * Fetches the tasks from localStorage.
 * @returns {Array} An array of tasks. Defaults to an empty array if nothing is stored.
 */
export const getTasksFromStorage = () => {
  try {
    const savedTasks = localStorage.getItem(TASK_STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Error retrieving tasks from localStorage:', error);
    return [];
  }
};

/**
 * Saves the tasks array to localStorage.
 * @param {Array} tasks - The array of tasks to save.
 */
export const setTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};
