import React, { Component } from 'react';
import {  Box } from '@material-ui/core';
import CreateTask from './createTask';
import TaskList from './taskList';
import taskService from '../services/taskService';


export class Home extends Component {
  static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleloadTasks = this.handleloadTasks.bind(this);
  
    }
     async handleStateChange(tasks) {
         this.setState({ tasks: tasks });
    }
 
    async handleloadTasks() {
        try {
            const { data } = await taskService.getAllTasks();
            if (data.length > 0) {
                await this.handleStateChange(data);
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                await this.setState({ errors: { tasks: "No tasks to show" } });
            }
        }
    }

    async componentDidMount() {
        await this.handleloadTasks();
    }



    render() {

      return (
          <>
              <h1>Task App</h1>
              <Box style={{ display: 'flex', 'flexDirection': 'row', height: '50vh' }}>
                  <CreateTask handleStateChange={this.handleStateChange} />
                  <TaskList handleStateChange={this.handleStateChange} tasks={this.state.tasks} />
              </Box>
              </>
    );
  }
}
