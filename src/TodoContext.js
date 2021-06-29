import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
    {
        id:1,
        text: '프로젝트 생성하기',
        done: true,
    },
    {
        id:2,
        text: '컴포넌트 스타일링하기',
        done: true,
    },
    {
        id:3,
        text: 'Context 만들기',
        done: false,
    },
    {
        id:4,
        text: '기능 구현하기',
        done: false,
    },
];

/*
    create
    toggle
    remove
*/
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'TOGGLE':
            //id가 같으면 해당 todo를 업데이트 하고 done 값에 반전된 값을 넣기
            return state.map(
                todo => todo.id === action.id ?
                {...todo, done: !todo.done} : todo
            );
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error (`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
//id값은 useRef로 관리
const TodoNextIdContext = createContext();

export function TodoProvider({children}) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

//context를 나눈 이유는 최적화를 위함
export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}
export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

// export function useTodoDispatch() {
//     return useContext(TodoDispatchContext);
// }

// export function useTodoNextId() {
//     return useContext(TodoNextIdContext);
// }