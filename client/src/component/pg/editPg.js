import React from 'react'
import axios from '../config/axios';
import PgForm from './form'

class PgEdit extends React.Component {
    constructor() {
        super()
        this.state = {
            pg: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id
        axios.get(`/pgs/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const pg = response.data
                this.setState(() => ({ pg, isLoaded: true }))
            })
            .catch((err) => {
                console.log(err)
            })
    }

    submitHandle = (data) => {
        var formData = {}
        // for (var pair of data.entries()) {
        //     formData[pair[0]] = pair[1]
        // }
        axios.put(`/pgs/${this.state.pg._id}`, formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const pg = response.data
                this.props.history.push(`/pg/${pg._id}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        //const { classes } = this.props;
        return (
            <div className="container">
                {this.state.isLoaded && <PgForm pgName={this.state.pg.pgName} address={this.state.pg.address} amenities={this.state.pg.amenities} deposit={this.state.pg.deposit} description={this.state.pg.description} foods={this.state.pg.foods} pgRent={this.state.pg.pgRent} pgTypes={this.state.pg.pgTypes} roomTypes={this.state.pg.roomTypes} rules={this.state.pg.rules} pgSubmitHandle={this.submitHandle} />}
            </div>
        )
    }
}

export default PgEdit