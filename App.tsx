import React from 'react';
import Home from './src/pages/Home';
import {TasksProvider} from './src/context/TasksContext';

const App = () => {
  return (
    <TasksProvider>
      <Home />
    </TasksProvider>
  );
};

export default App;
