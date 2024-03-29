import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getToken } from '../publics/redux/action/user';
import ModalAlert from './ModalAlert'
class Nav extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: "",
            loading: true
        }
    }
    setModal = () => {
        this.setState({ modal: "" })
    }
    componentDidMount = () => {
        this.props.dispatch(getToken(localStorage.getItem('token'), localStorage.getItem('id')))
    }
    destroy = () => {
        if (this.state.loading) {
            // eslint-disable-next-line
            this.state.loading = false
            // eslint-disable-next-line
            const modal = <ModalAlert show={true} pesan={"Logout Sukses"} success={true} link={"/"} setModal={this.setModal} enabled={() => this.state.loading = true} />
            this.setState({ modal: modal })
            localStorage.clear()
        }
    }
    render() {
        const dropdown =
            <ul className={'dropdown'} style={{ float: "right", margin: 0, listStyleType: "none", padding: 0, marginRight: "40px" }}>
                <li><p style={{ margin: 0, padding: "5px 10px 20px 10px", fontSize: "14pt", marginBottom: "-3px", float: "right", zIndex: 10, cursor: "pointer", background: "white" }}>{localStorage.fullname}</p>
                    <ul style={{ margin: 0, overflow: "hidden", padding: "20px 10px 10px 20px", listStyleType: "none", background: "white", textAlign: "left", width: 100, borderRadius: "10px", boxShadow: "1px 1px 3px #ddd", clear: "both" }}>
                        <Link to={"/pinjam"}><li style={{ padding: "5px 10px" }}>History</li></Link>
                        <Link to={"/"}><li style={{ padding: "5px 10px" }}>Profile</li></Link>
                        {localStorage.role === "Librarian" ? <Link to={"/users"}><li style={{ padding: "5px 10px" }}>Users</li></Link> : ""}
                        <li style={{ padding: "5px 10px", cursor: "pointer", }} onClick={this.destroy}>Logout</li>
                    </ul>
                </li>
            </ul>
        return (
            <div>
                {this.state.modal}
                <div id="header">
                    <span><Link to="/" style={{ textDecoration: 'none', color: "black" }}>BOOKS</Link></span>
                    <div style={{ float: "right" }}>
                        {/* <span style={{}}><Link to="/pinjam" style={{ textDecoration: 'none', color: "black" ,fontSize:"15pt",float:"left" }}>Pinjam</Link></span> */}
                        {localStorage.id ? dropdown : <span style={{ padding: "20px" }}><Link to="/login" style={{ textDecoration: 'none', color: "black", fontSize: "15pt" }}>login</Link></span>}
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