import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItems';
import { useTodoState } from '../TodoContext';

const TodoListBlock = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

function TodoList() {
    ////////////기능구현//////////
    //context API 사용하면
    const todos = useTodoState();
    return (
        <TodoListBlock>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    text={todo.text}
                    done={todo.done}
                />
            ))}
        </TodoListBlock>
    );
    ////////////////////////////////
}

export default TodoList;