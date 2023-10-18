export const addProject = (project) => ({
    type: 'ADD_PROJECT',
    payload: project,
  });
  export const deleteProject = (projectId) => ({
    type: 'DELETE_PROJECT',
    payload: projectId,
  });
  export const updateProject = (project) => ({
    type: 'UPDATE_PROJECT',
    payload: project,
  });
  export const addTask = (task) => ({
    type: 'ADD_TASK',
    payload: task,
  });

  
  export const deleteTask = (taskId) => ({
    type: 'DELETE_TASK',
    payload: taskId,
  });
  export const updateTask = (task) => ({
    type: 'UPDATE_TASK',
    payload: task,
  });