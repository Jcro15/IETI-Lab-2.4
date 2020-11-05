import React, { Component } from 'react';
import './App.css';
import { TodoList } from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { Fab, Modal } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import DialogContent from '@material-ui/core/DialogContent';
import NewTask from './NewTask'
import axios from 'axios';
import { withRouter } from 'react-router-dom'









const useStyles = theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    fab2: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    }
})


class TodoApp extends Component {

    constructor(props) {
        super(props);
        this.state = { open: false, items: [] };
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.axios = axios.create({
            baseURL: 'http://localhost:8080/api/'
        });
    }

    componentDidMount() {
        this.axios.get("/todo")
            .then(res => {
                var tasksl = []
                res.data.forEach(function (task) {
                    task.dueDate = moment(task.dueDate, 'YYYY-MM-DD')
                    tasksl.push(task)
                });
                this.setState({ items: tasksl });

            })
    }


    render() {
        const { classes } = this.props;
        return (
            <div className="App">
                <br />
                <br />
                <TodoList todoList={this.state.items} />
                <Fab color="primary" aria-label="Add" className={classes.fab} onClick={this.handleModal}>
                    <AddIcon />
                </Fab>
                <Modal open={this.state.open}
                    onClose={this.handleModal}
                >
                    <NewTask handleSubmit={this.handleSubmit} />
                </Modal>

            </div>
        );
    }



    handleModal() {
        this.setState(prevstate => ({
            open: !prevstate.open
        }))
    }

    handleSubmit(task) {
        let data = new FormData();
        data.append('file', task.file);
        this.axios.post("/files", data).then(response => {
            delete task.file
            task.fileUrl=response.data
            this.axios.post("/todo", task)
                .then(res => console.log(res))
            this.setState(prevState => ({
                items: prevState.items.concat(task)
            }));
            this.handleModal();
        }).catch(function (error) {
            console.log("failed file upload", error);
        });
       
    }


}

export default withStyles(useStyles, { withTheme: true })(TodoApp)




