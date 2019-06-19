import React from 'react';
import axios from '../config/axios'
import { Link } from 'react-router-dom'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'
import FilterPg from './filter'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class PgList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pgs: [],
      actualPgs: [],
      isLoaded: false,
      isOpen: false,
      photoIndex: 0,
      average: 0
    }
  }

  onFilterChange(change) {
    let pg = this.filterPGs(change);
    this.setState({ pgs: pg });
  }

  filterPGs(change) {
    let pg = [...this.state.actualPgs];
    if (change.pgTypes.Boys) {
      pg = pg.filter(x => x.pgTypes === "Boys");
    }
    else if (change.pgTypes.Girls) {
      pg = pg.filter(x => x.pgTypes === "Girls");
    }
    let localPg = { singleShare: [], twoSharing: [], threeSharing: [], fourSharing: [] };
    let hasFilter = false;
    if (change.roomTypes.singleSharing.value) {

      localPg.singleShare = pg.filter(x => x.roomTypes.includes(change.roomTypes.singleSharing.name));
      hasFilter = true;
    }
    if (change.roomTypes.twoSharing.value) {
      localPg.twoSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.twoSharing.name));
      hasFilter = true;
    }
    if (change.roomTypes.threeSharing.value) {
      localPg.threeSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.threeSharing.name));
      hasFilter = true;
    }
    if (change.roomTypes.fourSharing.value) {
      localPg.fourSharing = pg.filter(x => x.roomTypes.includes(change.roomTypes.fourSharing.name));
      hasFilter = true;
    }
    if (hasFilter) {
      pg = this.findUnique(localPg.singleShare.concat(localPg.twoSharing).concat(localPg.threeSharing).concat(localPg.fourSharing), d => d._id);
    }
    return pg;
  }

  findUnique(arr, predicate) {
    var found = {};
    arr.forEach(d => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map(key => found[key]);
  }

  componentDidMount() {
    axios.get('/pgs', {
      headers: {
        'x-auth': localStorage.getItem('token')
      }
    })
      .then((response) => {
        const pgs = response.data

        this.setState({
          pgs: pgs, actualPgs: pgs, isLoaded: true
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  reset() {
    let pg = [...this.state.actualPgs]
    this.setState({ pgs: pg })
  }


  render() {
    const { classes } = this.props;
    const { photoIndex, isOpen } = this.state;

    return (<React.Fragment>

      <CssBaseline />

      <div className={classNames(classes.layout, classes.cardGrid)}>
        <Grid container >
          <Grid item xs={4} sm={4} >

            <FilterPg onFilterChange={this.onFilterChange.bind(this)}
              reset={this.reset.bind(this)} />

          </Grid>
          <Grid item xs={8} sm={8} lg={8}>
            <Grid container spacing={24}>
              {this.state.pgs.map((pg) => {
                return (
                  <Grid item key={pg._id} sm={3} md={3} lg={4}  >
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={pg.image[0]}
                        onClick={() => this.setState({ isOpen: true })}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom component="h2">
                          {`PG Name:-${pg.pgName}`}
                        </Typography>
                        <Typography>
                          {`PG Address:-${pg.address}`}
                        </Typography>
                        <Typography>
                          {`PG Type:-${pg.pgTypes}`}
                        </Typography>

                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary"><Link to={`/pg/${pg._id}`} >view</Link> </Button>  <Button size="small" color="primary"><Link to={`/pg/edit/${pg._id}`}>edit</Link></Button>
                      </CardActions>
                    </Card>
                    {isOpen && (
                      <Lightbox
                        mainSrc={pg.image[photoIndex]}
                        nextSrc={pg.image[(photoIndex + 1) % pg.image.length]}
                        prevSrc={pg.image[(photoIndex + pg.image.length - 1) % pg.image.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                          this.setState({
                            photoIndex: (photoIndex + pg.image.length - 1) % pg.image.length,
                          })
                        }
                        onMoveNextRequest={() =>
                          this.setState({
                            photoIndex: (photoIndex + 1) % pg.image.length,
                          })
                        }
                      />

                    )}

                  </Grid>

                )
              })
              }        </Grid>
          </Grid>
        </Grid>

      </div>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>

        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Developed By Kumar sundram and Sachin Naglikar
                </Typography>
      </footer>

    </React.Fragment>
    );
  }
}


PgList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PgList);