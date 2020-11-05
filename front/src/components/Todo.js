import React from 'react';
import {Fab, ListItem, Card ,Typography,CardContent} from '@material-ui/core';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';


const useStyles = theme => ({
    media: {
      height: 100,
    },
  })

 class Todo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        let showFile
        if(this.props.fileUrl.endsWith(".pdf")){
            showFile=<div style={{ margin: "auto",
            width: "50%",
            padding: "10px"}}>  
                        <a href={this.props.fileUrl}>
                        <Fab
                    color="primary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended"
                >
                    <PictureAsPdfIcon /> View File
                </Fab>      
                        </a>    
                     </div>
        }else{
            showFile= <CardMedia
                        className={classes.media}
                        image={this.props.fileUrl }/>
        }
        return (
            <ListItem alignItems="flex-start" >
                <Card style={{ minWidth: 275 }}>
                    {showFile}
                    <CardContent>
                        <Typography variant="h5" component="h2">
                         {this.props.responsibleName}
                        </Typography>
                        <Typography color="textSecondary">
                           {this.props.responsibleEmail} </Typography>

                         <Typography variant="body2" component="p" gutterBottom>
                         {this.props.description }
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {this.props.status + " - "+ this.props.dueDate.format('DD-MM-YYYY')}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {"Priority:"+ this.props.priority}
                        </Typography>
                        

   
                    </CardContent>
                </Card>
            </ListItem>
       
        );
    }

}
export default withStyles(useStyles, { withTheme: true })(Todo);