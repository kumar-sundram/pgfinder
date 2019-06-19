import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: ''
    };

  }
  handleName = (event) => {
    const name = event.target.value;
    this.setState(() => ({ name }));
  };

  getLocation = (res) => {
    const location = res.target.value
    this.setState(() => ({ location }))
  }

  render() {
    console.log(this.state)
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            location
                    </Typography>

          <InputLabel htmlFor="location">Location</InputLabel>
          <Input type="text" name="text" onChange={this.handleName} /><br />
          <Button fullWidth variant="contained" color="primary" value="submit"
            className={classes.submit} onClick={this.getLocation}>
            Location
                        </Button><br />
          <iframe title="myFrame" width="300" height="300" src={`https://maps.google.com/maps?q=${this.state.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`} ></iframe>
        </Paper>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Developed By Kumar sundram and Sachin Naglikar
                </Typography>
        </footer>
      </main>
    )
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);


