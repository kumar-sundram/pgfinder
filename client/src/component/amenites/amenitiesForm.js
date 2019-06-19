// import React from 'react'
// import axios from '../config/axios'
// import { Form, Input, FormGroup, Label, Container, Row, Col, Button } from 'reactstrap'

// class AmenitiesForm extends React.Component {
//     constructor() {
//         super()
//         this.state = {
//             name: ''
//         }
//     }

//     nameChange = (e) => {
//         const name = e.target.value
//         this.setState(() => ({ name }))
//     }

//     amenitiesSubmit = (e) => {
//         e.preventDefault()
//         const formData = {
//             name: this.state.name
//         }
//         axios.post('/amenities', formData, {
//             headers: {
//                 'x-auth': localStorage.getItem('token')
//             }
//         })
//             .then((response) => {
//                 this.setState(() => ({
//                     name: ''
//                 }))
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }

//     render() {
//         return (
//             <div>
//                 <h2 >Add Amenites</h2>
//                 <Form onSubmit={this.amenitiesSubmit}>
//                     <Container>
//                         <Row>
//                             <Col>
//                                 <FormGroup>
//                                     <Label>
//                                         <Label><h5>Amenities Name</h5></Label>
//                                         <Input type="text" value={this.state.name} onChange={this.nameChange} />
//                                     </Label>
//                                 </FormGroup>
//                                 <Button>submit</Button>
//                             </Col>
//                         </Row>
//                     </Container>
//                 </Form>
//             </div>
//         )
//     }
// }

// export default AmenitiesForm
import React from 'react';
import axios from '../config/axios'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class AmenitiesForm extends React.Component {
    constructor() {
        super()
        this.state = {
            name: ''
        }
    }

    nameChange = (e) => {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    amenitiesSubmit = (e) => {
        e.preventDefault()
        const formData = {
            name: this.state.name
        }
        axios.post('/amenities', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState(() => ({
                    name: ''
                }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        const { classes } =this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add Amenities
        </Typography>
                    <form className={classes.form} onSubmit={this.amenitiesSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Amenities Name</InputLabel>
                            <Input id="email" name="email" type="text" value={this.state.name} onChange={this.nameChange} autoComplete="email" autoFocus />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
          </Button>
                    </form>
                </Paper>
            </main>
        );
    }
}
AmenitiesForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AmenitiesForm);