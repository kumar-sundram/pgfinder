import React from 'react'
import axios from '../component/config/axios'
import { connect } from 'react-redux'
import { removeUser } from '../component/redux/actions/user'

class Logout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedToken: localStorage.getItem('token')
        }
    }

    componentDidMount() {
        console.log('logout')
        axios.delete('/users/logout', { headers: { 'x-auth': localStorage.getItem('token') } })
            .then((response) => {
                console.log(response)
                this.props.dispatch(removeUser({}))
                localStorage.removeItem('token')
                this.props.history.push('/users/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    render() {
        return (
            <>
            </>
        )
    }
}

export default connect()(Logout)