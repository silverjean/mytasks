import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {renderHook, act} from '@testing-library/react-native';

import {useTaskList} from '../../src/context/TasksContext';
import {TasksProvider} from '../../src/context/TasksContext';
import {TaskList} from '../../src/components/TaskList';

describe('TaskList component', () => {
  it('verifica se o click no botão remove um item na lista de tarefas', async () => {
    render(<TaskList />, {
      wrapper: TasksProvider,
    });

    const {result} = renderHook(() => useTaskList(), {
      wrapper: TasksProvider,
    }); //precisa ser renderizado dentro de um provider

    const data = {id: 'task01', title: 'Task 01'};

    await act(() => result.current.addTask(data));

    expect(result.current.tasks[0].title).toEqual('Task 01');

    await act(() => result.current.removeTask('task01'));

    expect(result.current.tasks.length).toEqual(0);
  });
});
