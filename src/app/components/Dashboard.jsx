import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';
import axios from 'axios';
import Pokemon from './Pokemon';

export const Dashboard = ({groups}) => {
    // useEffect(() => {
    //     axios.get(`https://pokeapi.co/api/v2/pokemon/ditto`)
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // },[]);

    return(
        <div>
            <h2>Dashboard</h2>
            {/* <Pokemon /> */}
            {groups.map(group => {
                return (
                    <ConnectedTaskList key={group.id} id={group.id} name={group.name} />
                )
            })}
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        groups: state.groups
    }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);