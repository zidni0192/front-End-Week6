import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../publics/redux/action/user';

class Nav extends Component {
    componentDidMount = () => {
        this.props.dispatch(getToken(localStorage.getItem('token'), localStorage.getItem('id')))
    }
    render() {
        const dropdown =
            <ul className={'dropdown'} style={{ float: "right", margin: 0, listStyleType: "none", padding: 0, marginRight: "40px" }}>
                <li><p style={{ margin: 0, padding: "5px 10px 20px 10px", fontSize: "14pt", marginBottom: "-3px", float: "right", zIndex: 10, cursor: "pointer", background: "white" }}>Link</p>
                    <ul style={{ margin: 0, padding: 0, overflow: "hidden", padding: "20px 10px 10px 20px", listStyleType: "none", background: "white", textAlign: "left", width: 100, borderRadius: "10px", boxShadow: "1px 1px 3px #ddd", clear: "both" }}>
                        <Link to={"/"}><li style={{ padding: "5px 10px" }}>History</li></Link>
                        <Link to={"/"}><li style={{ padding: "5px 10px" }}>Profile</li></Link>
                        <Link to={"/"}><li style={{ padding: "5px 10px" }}>Logout</li></Link>
                    </ul>
                </li>
            </ul>
        return (
            <div>
                <div id="header">
                    <span><Link to="/" style={{ textDecoration: 'none', color: "black" }}>BOOKS</Link></span>
                    <div style={{ float: "right" }}>
                        {/* <span style={{}}><Link to="/pinjam" style={{ textDecoration: 'none', color: "black" ,fontSize:"15pt",float:"left" }}>Pinjam</Link></span> */}
                        {this.props.user && this.props.user.userList.id ? dropdown : <span style={{ padding: "20px" }}><Link to="/login" style={{ textDecoration: 'none', color: "black", fontSize: "15pt" }}>login</Link></span>}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(Nav)