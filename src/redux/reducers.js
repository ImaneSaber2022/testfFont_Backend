import { combineReducers } from 'redux';

const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PROJECT':
      return [...state, action.payload];
    case 'DELETE_PROJECT':
      return state.filter((project) => project.id !== action.payload);
      case 'UPDATE_PROJECT':
        return state.map((project) => {
          if (project.id === action.payload.id) {
            return {
              ...project,
              ...action.payload,
            };
          }
          return project;
        });
      default:
        return state;
  }
};

const tasksReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
      case 'UPDATE_TASK':
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            ...action.payload,
          };
        }
        return task;
      });
    default:
      return state;
    
  }
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
});

export default rootReducer;