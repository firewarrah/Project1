import React, { Component } from 'react';
import taskService from '../services/taskService';
import TextField from '@material-ui/core/TextField';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

import { Button, InputLabel, Paper, Container } from '@material-ui/core';

class CreateTask extends Component{
    constructor(props) {
        super(props);
        this.state = {
        file: "",
        text: "",
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
  

     async onFormSubmit(e) {
        e.preventDefault()
        const { file, text } = this.state;
         await taskService.createTask(file, text);
         const tasks = await taskService.getAllTasks();
         await this.props.handleStateChange(tasks.data);
         await this.setState({
             file: "",
             text: ""
         });
    }

    onChange(e){
        switch (e.target.type) {
            case 'file':
                this.setState({ file: e.target.files[0] });
                break;
            case 'text':
                this.setState({ text: e.target.value });
                break;
        }

    }

    render() {
        return (
            <div style={{ width: '50%'}}>

                <Paper style={{  display: 'flex', 'flexDirection': 'column', height: '100%', 'alignItems':'center', 'justifyContent':'flex-start' }}>
                   
                 
                      <Container maxWidth="sm">
                        <form style={{'width':'100%'}}>
  
                           
                              
                                <InputLabel htmlFor="task-input">
                                <TextField 
                                        id="task-input"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        label="Type in a new task"
                                        type="text"
                                        name="text"
                                        value={this.state.text}
                                    onChange={this.onChange}
                                    autoFocus
                                        required />
                                </InputLabel>
                                
                        
                            
                                <InputLabel htmlFor="btn-upload">
                                <TextField
                                
                                        id="btn-upload"
                                        name="btn-upload"
                                        style={{ display: 'none' }}
                                        type="file"
                                        accept="image/*"
                                        onChange={this.onChange}
                                        required />
                                    <Button
                                    className="btn-choose"
                                    fullWidth
                                    variant="outlined"
                                    component="div"
                                    endIcon={<AddPhotoAlternateIcon ></AddPhotoAlternateIcon>}                           >
                                    Choose Image 
                                    </Button>

                            </InputLabel>
                         
                          
                        <Button className="btn-upload" fullWidth color="primary" variant="contained" component="span" type="submit" onClick={this.onFormSubmit} style={{ 'alignItems': 'flex-end', 'justifyContent': 'center', 'alignSelf': 'center' }}> Add Task</Button>
                    
                        </form>
                        </Container>
                    </Paper>
         
              </div>
            )
    }
}

export default CreateTask;