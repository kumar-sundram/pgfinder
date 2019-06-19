import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio'
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
      width: 800,
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

class PgForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pgName: props.pgName ? props.pgName : '',
      roomTypes: props.roomTypes ? props.roomTypes : [],
      pgTypes: props.pgTypes ? props.pgTypes : '',
      foods: props.foods ? props.foods : '',
      amenities: props.amenities ? props.amenities : [],
      address: props.address ? props.address : '',
      description: props.description ? props.description : '',
      rules: props.rules ? props.rules : '',
      pgRent: props.pgRent ? props.pgRent : '',
      deposit: props.deposit ? props.deposit : '',
      filename: '',
    }
  }

  pgNameChange = (e) => {
    const pgName = e.target.value
    this.setState({ pgName: pgName })
  }

  roomTypeChange = (e) => {
    e.persist()
    var nameType = e.target.name
    var value = e.target.value
    var checked = e.target.checked
    if (checked) {
      this.setState((prevState) => ({
        nameType: prevState.roomTypes.push(value)
      }))
    } else {
      this.setState((prevState) => ({
        nameType: prevState.roomTypes.splice(prevState.roomTypes.indexOf(value), 1)
      }))
    }
  }

  pgTypeChange = (e) => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  foodChange = (e) => {
    e.persist()
    this.setState(() => ({
      [e.target.name]: e.target.value
    }))
  }

  amenitiesChange = (e) => {
    e.persist()
    var checked = e.target.checked
    var nameType = e.target.name
    var value = e.target.value

    if (checked) {
      this.setState((prevState) => ({
        nameType: prevState.amenities.push(value)
      }))
    } else {
      this.setState((prevState) => ({
        nameType: prevState.amenities.splice(prevState.amenities.indexOf(value), 1)
      }))
    }
  }

  addressChange = (e) => {
    const address = e.target.value
    this.setState(() => ({ address }))
  }

  descriptionChange = (e) => {
    const description = e.target.value
    this.setState(() => ({ description }))
  }

  rulesChange = (e) => {
    const rules = e.target.value
    this.setState(() => ({ rules }))
  }

  rentChange = (e) => {
    const pgRent = e.target.value
    this.setState(() => ({ pgRent }))
  }

  depositChange = (e) => {
    const deposit = e.target.value
    this.setState(() => ({ deposit }))
  }

  imageChange = (e) => {
    const filename = e.target.files
    this.setState(() => ({ filename }))
  }

  pgSubmitHandle = (e) => {
    e.preventDefault()
    let { pgName, roomTypes, pgTypes, foods, amenities, address, description, rules, pgRent, deposit } = this.state
    const data = new FormData()
    data.append("pgName", pgName)
    for (let roomType of roomTypes) {
      data.append("roomTypes", roomType)
    }
    data.append("pgTypes", pgTypes)
    data.append("foods", foods)
    for (let amenity of amenities) {
      data.append("amenities", amenity)
    }
    data.append("address", address)
    data.append("description", description)
    data.append("rules", rules)
    data.append("pgRent", pgRent)
    data.append("deposit", deposit)
    for (let file of this.state.filename) {
      data.append("image", file)
    }
    this.props.pgSubmitHandle(data)
  }

  render() {
    const { selectedOption } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add pgDetails
        </Typography>
          <form className={classes.form} onSubmit={this.pgSubmitHandle}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="pgName">pgName</InputLabel>
              <Input type="text" value={this.state.pgName} onChange={this.pgNameChange} placeholder="PG Name" autoComplete="pgName" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Address">Address</InputLabel>
              <Input name="Address" type="textarea" value={this.state.address} onChange={this.addressChange}
                placeholder="Address" autoComplete="Address" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Description">Description</InputLabel>
              <Input name="Description" type="textarea" value={this.state.description} onChange={this.descriptionChange} placeholder="Description" autoComplete="Description" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Pgrules">Pg rules</InputLabel>
              <Input name="Pgrules" type="textarea" value={this.state.rules} onChange={this.rulesChange} placeholder="PG Rules" autoComplete="Pgrules" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Rent">Rent</InputLabel>
              <Input name="Rent" type="number" value={this.state.pgRent} onChange={this.rentChange}
                placeholder="Rent" autoComplete="Rent" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Deposit">Deposit</InputLabel>
              <Input name="Deposit" type="number" value={this.state.deposit} onChange={this.depositChange}
                placeholder="Deposit" autoComplete="Deposit" />
            </FormControl>
            <InputLabel>pgTypes</InputLabel><br />
            <FormControlLabel
              control={<Radio type="radio" value="Boys" checked={this.state.pgTypes.includes('Boys')} onChange={this.pgTypeChange} name="pgTypes" color="primary" />}
              label="Boys"
            />
            <FormControlLabel
              control={<Radio type="radio" value="Girls" checked={this.state.pgTypes.includes('Girls')} onChange={this.pgTypeChange} name="pgTypes" color="primary" />}
              label="Girls"
            /><br />
            <InputLabel>Food</InputLabel><br />
            <FormControlLabel
              control={<Radio type="radio" value="Veg" checked={this.state.foods.includes('Veg')} onChange={this.foodChange} name="foods" color="primary" />}
              label="Veg"
            />
            <FormControlLabel
              control={<Radio type="radio" value="Non-veg" checked={this.state.foods.includes('Non-veg')} onChange={this.foodChange} name="foods" color="primary" />}
              label="Non-veg"
            />
            <FormControlLabel
              control={<Radio type="radio" value="Both" checked={this.state.foods.includes('Both')} onChange={this.foodChange} name="foods" color="primary" />}
              label="Both"
            /> <br />

            <InputLabel>Room Types</InputLabel><br />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="One And Sharing" checked={this.state.roomTypes.includes('One And Sharing')} onChange={this.roomTypeChange} name="roomTypes" color="primary" />}
              label="One and Sharing"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Two And Sharing" checked={this.state.roomTypes.includes('Two And Sharing')} onChange={this.roomTypeChange} name="roomTypes" color="primary" />}
              label="Two and Sharing"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Three And Sharing" checked={this.state.roomTypes.includes('Three And Sharing')} onChange={this.roomTypeChange} name="roomTypes" color="primary" />}
              label="Three and Sharing"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Four And Sharing" checked={this.state.roomTypes.includes('Four And Sharing')} onChange={this.roomTypeChange} name="roomTypes" color="primary" />}
              label="Four and Sharing"
            /> <br />
            <InputLabel>Amenities</InputLabel><br />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Wifi" checked={this.state.amenities.includes('Wifi')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Wifi"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Laundery" checked={this.state.amenities.includes('Laundery')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Laundery"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Mess" checked={this.state.amenities.includes('Mess')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Mess"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="T.V" checked={this.state.amenities.includes('T.V')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="TV"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Refrigerator" checked={this.state.amenities.includes('Refrigerator')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Refrigerator"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Lift" checked={this.state.amenities.includes('Lift')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Lift"
            />
            <FormControlLabel
              control={<Checkbox type="checkbox" value="Room Cleaning" checked={this.state.amenities.includes('Room Cleaning')} onChange={this.amenitiesChange} name="amenities" color="primary" />}
              label="Room Cleaning"
            />

            <InputLabel>Image
                      <input type="file" multiple name="image" onChange={this.imageChange} />
            </InputLabel>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Add pg
          </Button>
            <Button size="small" color="primary"><Link to={`/pg`} >back</Link> </Button>
          </form>
        </Paper>
      </main>
    )
  }
}

PgForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PgForm);