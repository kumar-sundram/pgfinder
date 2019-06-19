import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio'
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: '60%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 1,
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

class FilterPg extends React.Component {
  constructor() {
    super()
    this.state = this.resetFilter();
  }

  pgTypeChange = (e) => {
    e.persist();
    let state = { ...this.state };
    state.pgTypes.Girls = false;
    state.pgTypes.Boys = false;
    state.pgTypes[e.target.id] = e.target.checked;
    this.setState(() => (state), () => { this.props.onFilterChange(this.state); })
  }

  roomTypeChange = (e) => {
    e.persist();
    let state = { ...this.state };
    state.roomTypes[e.target.id].value = e.target.checked;
    this.setState(() => (state), () => { this.props.onFilterChange(this.state); });
  }

  resetFilter() {
    return {
      pgTypes: {
        Boys: false,
        Girls: false
      },
      roomTypes: {
        singleSharing: {
          name: 'One And Sharing',
          value: false
        },
        twoSharing: {
          name: 'Two And Sharing',
          value: false
        },
        threeSharing: {
          name: 'Three And Sharing',
          value: false
        },
        fourSharing: {
          name: 'Four And Sharing',
          value: false
        }
      }
    };
  }

  reset(e) {
    e.preventDefault()
    this.setState(this.resetFilter(), () => { this.props.reset(this.state) })
  }

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Filter
        </Typography>
          <InputLabel>
            <h5>PG Type</h5>
          </InputLabel>
          <FormControlLabel
            control={<Radio type="radio" id="Boys" checked={this.state.pgTypes.Boys} name="pgTypes" onChange={this.pgTypeChange.bind(this)} color="primary" />}
            label="Boys"
          />
          <FormControlLabel
            control={<Radio type="radio" id="Girls" checked={this.state.pgTypes.Girls} name="pgTypes" onChange={this.pgTypeChange.bind(this)} color="primary" />}
            label="Girls"
          />
          <InputLabel>
            <h5>Room Type</h5>
          </InputLabel>
          <FormControlLabel
            control={<Checkbox type="checkbox" id="singleSharing" checked={this.state.roomTypes.singleSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} color="primary" />}
            label="One and Sharing"
          />
          <FormControlLabel
            control={<Checkbox type="checkbox" id="twoSharing" checked={this.state.roomTypes.twoSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} color="primary" />}
            label="Two and Sharing"
          />
          <FormControlLabel
            control={<Checkbox type="checkbox" id="threeSharing" checked={this.state.roomTypes.threeSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} color="primary" />}
            label="Three and Sharing"
          />
          <FormControlLabel
            control={<Checkbox type="checkbox" id="fourSharing" checked={this.state.roomTypes.fourSharing.value} name="roomTypes" onChange={this.roomTypeChange.bind(this)} color="primary" />}
            label="Four and Sharing"
          />
          <Button type="button" fullWidth variant="contained"
            color="primary" onClick={this.reset.bind(this)}>Reset</Button>
        </Paper>
      </main>
    );
  }
}

FilterPg.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterPg);