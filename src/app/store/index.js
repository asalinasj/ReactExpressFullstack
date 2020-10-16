import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

export const store = createStore(
    // function reducer(state = defaultState, action) {
    //     return state;
    // },
    combineReducers({
        session(userSession = defaultState.session || {}, action) {
            let {type,authenticated,session} = action;
            switch(type) {
                case mutations.REQUEST_AUTHENTICATE_USER:
                    return {...userSession, authenticated:mutations.AUTHENTICATING};
                case mutations.PROCESSING_AUTHENTICATE_USER:
                    return {...userSession, authenticated};
                default:
                    return userSession;
            }
        },
        tasks(tasks = defaultState.tasks, action) {
            switch(action.type) {
                case mutations.CREATE_TASK:
                    console.log(action);
                    return [...tasks, {
                        id: action.taskID,
                        name: "New Task",
                        group: action.groupID,
                        owner: action.ownerID,
                        isComplete: false
                    }]
                case mutations.SET_TASK_COMPLETE:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ? 
                            {...task, isComplete: action.isComplete} :
                            task;
                    });
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        return (task.id === action.taskID) ?
                            {...task, group: action.groupID} :
                            task
                    })
            }
            return tasks;
        },
        comments(comments = defaultState.comments) {
            return comments;
        },
        groups(groups = defaultState.groups) {
            return groups;
        },
        users(users = defaultState.users) {
            return users;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for(let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}