import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-native';

import {useTaskList} from '../../src/context/TasksContext';
import Home from '../../src/pages/Home';
import {TasksProvider} from '../../src/context/TasksContext';

describe('Home page', () => {
  it('renders correctly', () => {
    const {getByPlaceholderText} = render(<Home />);

    const inputNewTask = getByPlaceholderText('Insira a nova tarefa');

    expect(inputNewTask).toBeDefined();

    expect(inputNewTask.props.placeholder).toBeTruthy();
    // console.log(inputNewTask);
  });

  it('verifica a inserção de um item na lista de tarefas', async () => {
    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    }); //precisa ser renderizado dentro de um provider

    const data = {id: 'task01', title: 'Task 01'};

    await act(() => result.current.addTask(data));

    expect(result.current.tasks).toBeTruthy();
  });
  it('verifica se o click no botão insere um item na lista de tarefas', async () => {
    const {getByPlaceholderText, getByTestId} = render(<Home />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    }); //precisa ser renderizado dentro de um provider

    const inputNewTask = getByPlaceholderText('Insira a nova tarefa');

    const button = getByTestId('addButton');

    const data = {id: 'task01', title: 'Task 01'};

    act(() => fireEvent.changeText(inputNewTask, data.title));

    await act(async () => {
      await fireEvent.press(button);
    });

    expect(result.current.tasks).toBeTruthy();
  });
});
