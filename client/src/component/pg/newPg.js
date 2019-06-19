import React from 'react'
import axios from '../config/axios'
import PgForm from './form'

class PgNew extends React.Component {
    constructor() {
        super()
        this.submitHandle = this.submitHandle.bind(this)
    }
    submitHandle(data) {
        console.log(data)
        axios.post('/pgs', data, {
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
        return (
            <div className="container">
                <div className="row">
                    <PgForm pgSubmitHandle={this.submitHandle} />
                </div>
            </div>

        )
    }
}

export default PgNew 