import React, {Component} from 'react';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import { Redirect } from 'react-router-dom';
import { withStyles} from '@material-ui/core/styles';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';



import {Fab, InputLabel,Button, TextField,Select, FormControl } from '@material-ui/core';



const useStyles =theme => ({
    paper: {
        margin:'auto',
        position:'fixed',
        top:0,
        bottom:0,
        left:0,
        right:0,
        width: 300,
        height: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
    
})

class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {description: '', status:'', dueDate: moment(),responsibleName:'',responsibleEmail:'',priority:'',file:null};
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this)

        
    }


    render() {
        const { classes } = this.props;
        return (  
            <div  className={classes.paper}  style={{textAlign:"center"} } tabIndex="-1">

            <form onSubmit={this.handleSubmit}>
                <h3>New TODO</h3>
                <label htmlFor="file">
                <input
                    style={{ display: 'none' }}
                    id="file"
                    name="file"
                    type="file"
                    onChange={this.handleInputChange}
                    accept="image/jpeg,image/png,application/pdf"
                />

                <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <InsertDriveFileIcon /> Upload File
                </Fab>
                </label>
                <TextField
                    id="description"
                    label="Description"
                    name="description"
                    onChange={this.handleChange}
                    value={this.state.description}>
                </TextField>
                <br/>
                <TextField
                    id="priority"
                    label="Priority"
                    name="priority"
                    type="number"
                    onChange={this.handleChange}
                    value={this.props.priority}>
                </TextField>
                <br/>
                <TextField
                    id="responsibleN"
                    label="Name"
                    name="responsibleName"
                    onChange={this.handleChange}
                    value={this.state.responsibleName}>
                </TextField>
                <br/>

                <TextField
                    id="responsibleE"
                    label="Email"
                    name="responsibleEmail"
                    onChange={this.handleChange}
                    value={this.state.responsibleEmail}>
                </TextField>
                <br/>
                <FormControl>
                <InputLabel htmlFor="label-status">
                    Status:
                </InputLabel>

                <Select
                    native
                    value={this.state.status}
                    name="status"
                    onChange={this.handleChange}
                    inputProps={{
                        name: 'status',
                        id: 'label-status',
                    }}
                    >
                    <option aria-label="None" value="" />    
                    <option value={"Activo"}>Activo</option>
                    <option value={"Pendiente"}>Pendiente</option>
                    <option value={"Terminado"}>Terminado</option>
                </Select>
                <br/>



                </FormControl>
                
                <br/>
                <TextField
                    id="due-date"
                    label= "Due-Date"
                    type="date"
                    onChange={this.handleDateChange}
                    defaultValue={this.state.dueDate.format('YYYY-MM-DD')}
                />
                <br/>
                <br/>

                <Button type="submit"
                            variant="contained"
                            color="primary"
                            className="submit">
                    Add 
                </Button>
            </form>
            </div>             
            
             
        );
    }
    handleInputChange(e) {
        this.setState({
            file: e.target.files[0]
        });                
    }
    handleChange(e) {
        let nam = e.target.name;
        let val = e.target.value;
        this.setState({[nam]: val});
      }

    handleDateChange(e) {
        this.setState({
            dueDate: moment(e.target.value,'YYYY-MM-DD')
        });
    }

    handleSubmit(e) {

        e.preventDefault();

        const newItem = {
            description: this.state.description,
            status: this.state.status,
            dueDate: this.state.dueDate,
            priority:this.state.priority,
            responsible: {name: this.state.responsibleName, email:this.state.responsibleEmail},
            file:this.state.file 
            
        };
        console.log(newItem)
        this.props.handleSubmit(newItem)
    }



}

export default withStyles(useStyles, { withTheme: true })(NewTask);
