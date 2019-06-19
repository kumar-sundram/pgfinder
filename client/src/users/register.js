import React from 'react';
import '../../src/App.css'
import PropTypes from 'prop-types';
import axios from '../component/config/axios'
import { Redirect } from 'react-router-dom'
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { FormLabel } from '@material-ui/core';

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
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: props.firstName ? props.firstName : '',
            middleName: props.middleName ? props.middleName : '',
            lastName: props.lastName ? props.lastName : '',
            email: props.email ? props.email : '',
            mobile: props.mobile ? props.mobile : '',
            password: props.password ? props.password : '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            mobileError: '',
            hidden: true,
            redirectList: false
        }

        this.handleEmail = this.handleEmail.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    //to be es6 arrow function based
    handleFirst = (e) => {
        const firstName = e.target.value
        this.setState(() => ({ firstName }))
    }
    handleMiddle = (e) => {
        const middleName = e.target.value
        this.setState(() => ({ middleName }))
    }
    handleLast = (e) => {
        const lastName = e.target.value
        this.setState(() => ({ lastName }))
    }
    handleEmail(e) {
        const email = e.target.value
        this.setState(() => ({ email }))
    }
    handlePassword = (e) => {
        const password = e.target.value
        this.setState(() => ({ password }))
    }
    //bind in inline event handler
    handleMobile = (e) => {
        const mobile = e.target.value
        this.setState(() => ({ mobile }))
    }

    toggleShow = () => {
        this.setState({ hidden: !this.state.hidden })
    }

    validate = () => {
        let isError = false
        const errors = {
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            passwordError: '',
            mobileError: ''
        }
        if (this.state.firstName.length < 3) {
            isError = true
            errors.firstNameError = "firstName at least 3 character"
        } if (this.state.lastName.length === 0) {
            isError = true
            errors.lastNameError = "lastName not be empty"
        }
        if (this.state.email.indexOf("@") === -1) {
            isError = true
            errors.emailError = "Require valid email id"
        }
        if (this.state.password.length === 0) {
            isError = true
            errors.passwordError = "password is empty"
        } if (this.state.mobile.length < 10) {
            isError = true
            errors.mobileError = "mobile number not be less than 10 digit"
        }
        this.setState({
            ...this.state,
            ...errors
        })
        return isError
    }

    handleSubmit(e) {
        e.preventDefault()
        const error = this.validate()
        if (!error) {
            const formData = {
                firstName: this.state.firstName,
                middleName: this.state.middleName,
                lastName: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                mobile: this.state.mobile
            }
            alert("form submitted")
            axios.post('/users/register', formData)
                .then((response) => {
                    this.setState(() => ({
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        password: '',
                        email: '',
                        mobile: '',
                        redirectList: true
                    }))
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        if (this.state.redirectList) {
            return <Redirect to="/users/login" />
        }
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstName">First name</InputLabel>
                            <Input id="firstName" name="firstName" autoComplete="firstName" value={this.state.firstName} onChange={this.handleFirst} autoFocus />
                            <FormLabel color="danger" error={true}>{this.state.firstNameError}</FormLabel>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="firstname">Middle name</InputLabel>
                            <Input id="middlename" name="middlename" autoComplete="middlename" value={this.state.middleName} onChange={this.handleMiddle} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="lastname">Last name</InputLabel>
                            <Input id="lastname" name="lastname" autoComplete="lastname" value={this.state.lastName} onChange={this.handleLast} />
                            <FormLabel color="danger" error={true}>{this.state.lastNameError}</FormLabel>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="mobile">Mobile</InputLabel>
                            <Input name="mobile" id="mobile" autoComplete="mobile"
                                type="Number" value={this.state.mobile} onChange={this.handleMobile} />
                            <FormLabel color="danger" error={true}>{this.state.mobileError}</FormLabel>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" value={this.state.email} onChange={this.handleEmail} />
                            <FormLabel color="danger" error={true}>{this.state.emailError}</FormLabel>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" id="password" autoComplete="current-password"
                                type={this.state.hidden ? "password" : "text"} value={this.state.password} onChange={this.handlePassword} />
                            <FormLabel color="danger" error={true}>{this.state.passwordError}</FormLabel>
                            <Button onClick={this.toggleShow}>Show/Hide</Button>
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button fullWidth variant="contained" color="primary" value="submit"
                            className={classes.submit} onClick={this.handleSubmit}>
                            Register
         </Button>
                    </form>
                </Paper>
            </main>
        )
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
