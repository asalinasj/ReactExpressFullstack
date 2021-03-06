import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

export const TaskList = ({tasks, name, id, createNewTask}) => {
    return (
        <div>
            <h3>
                {name}
            </h3>
            <div>
                {tasks.map((task) => {
                    return (
                        <Link to={`/task/${task.id}`} key={task.id}>
                            <div>{task.name}</div>
                        </Link>
                    );
                })}
            </div>
            <button onClick={() => createNewTask(id)}>Add New</button>
        </div>
    )
}

const mapStateToProps = (state, props) => {
    let groupID = props.id;
    return {
        name: props.name,
        id: groupID,
        tasks: state.tasks.filter(task => task.group === groupID)
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        createNewTask(id) {
            console.log("Creating new task...", id);
            dispatch(requestTaskCreation(id));
        }
    }
}

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TaskList);