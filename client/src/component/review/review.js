import StarRatings from 'react-star-ratings';
import React from 'react'
import { connect } from 'react-redux'
import axios from '../config/axios'

class Reviews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating: 0,
            hide: true
        }
    }

    componentDidMount() {
        const pg = this.props.pg
        const status = pg.review.some(item => item.user === this.props.person.user.userId)
        this.setState({
            hide: !status
        })
    }

    changeRating = (newRating) => {
        const prevReview = this.props.pg.review
        const updatedReview = [].concat(prevReview).concat({ rating: newRating, user: this.props.person.user.userId })
        const data = {
            review: updatedReview
        }
        axios.put(`/pgs/${this.props.id}`, data, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        }).then((response) => {
            this.setState({
                hide: false
            })
            this.props.calculateRating(response.data)
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.hide &&
                    <StarRatings
                        rating={this.state.rating}
                        changeRating={this.changeRating}
                        starRatedColor="blue"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="5px"
                    />
                }
            </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        person: state.users
    }
}

export default connect(mapStateToProps)(Reviews)