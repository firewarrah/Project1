import React, { Component } from "react";
import taskService from '../services/taskService';
import { Button, Paper, Typography, Box } from '@material-ui/core';
import TaskListItem from '../components/taskListItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.onAddTasks = this.onAddTasks.bind(this);
     
    }

    async onAddTasks() {
        const tasks = await taskService.getAllTasks();
        await this.props.handleStateChange(tasks.data);
    }


        render() {
            const tasks = this.props.tasks;
            return (
                <div style={{ width: '50%', display: 'flex', }}>
                    <Paper
                        style={{
                            padding: 16,
                            width: '100%',
                            height: '50vh',
                            display: 'flex',
                            'flexDirection': 'column',
                            overflow: 'auto'
                        }} >
                        <Typography variant="h6" className="list-header">
                            Current Tasks
          </Typography>
                        <Box>
                        {tasks.map(task => (
                            <TaskListItem key={task.id} task={task} />
                        ))}
                            </Box>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={this.onAddTasks}
                            style={{
                            'alignItems': 'flex-end', 'justifyContent': 'center', 'alignSelf': 'center' 
                            }}>
                            Load All
                            </Button>
                    </Paper>
                </div>
            )
        }
    }

export default TaskList;
