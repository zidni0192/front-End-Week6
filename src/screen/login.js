import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getByEmail } from '../publics/redux/action/user'
import { Redirect } from 'react-router-dom'
import ModalAlert from './ModalAlert';
class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: ""
        }
    }
    setModal = ()=>{
        this.setState({modal:""})
    }
    login = async (e) => {
        e.preventDefault()
        await this.props.dispatch(getByEmail({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }))
        if (this.props.user.userList === 'Password Salah') {
            const modal = <ModalAlert show={true} pesan={"Password Salah"} error={true} link={"/login"} setModal={this.setModal} />
            this.setState({ modal: modal })
        } else if (this.props.user.userList === "Email Tidak Terdaftar") {
            const modal = <ModalAlert show={true} pesan={"Email Tidak Terdaftar"} error={true} link={"/login"} setModal={this.setModal} />
            this.setState({ modal: modal })
        } else {
            const modal = <ModalAlert show={true} pesan={"Login Sukses"} success={true} link={"/"} setModal={this.setModal}/>
            this.setState({ modal: modal })
        }
    }
    render() {
        return (
            <div>
                {this.state.modal}
                <div style={{ marginBottom: 100,borderRadius: 5, width: 500, marginLeft: "50%", transform: "translateX(-50%)", overflow: "hidden", boxShadow: "0.5px 0.5px 2px #ddd", paddingBottom: 20 }}>
                    <div style={{ padding: "10px 40px", width: "100%", boxSizing: "border-box", boxShadow: "0.5px 0.5px 2px #ddd" }}>
                        <h2>Login</h2>
                    </div>
                    <div style={{ padding: "10px 40px", width: "100%", overflow: "hidden", boxSizing: "border-box", boxShadow: "0px 0px 0.1px #ddd" }}>
                        <form onSubmit={this.login}>
                            <div>
                                <p>Email</p>
                                <input autocomplete="off" type={'email'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'email'} required />
                            </div>
                            <div>
                                <p>Password</p>
                                <input type={'password'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'password'} required />
                            </div>
                            <div>
                                <p></p>
                                <button style={{ padding: 15, width: "100%", borderRadius: '5px', border: "0px", backgroundColor: "#24f555", color: "white", fontSize: "15pt", cursor: "pointer" }}>Login</button>
                                <p>Tidak Punya akun ? <Link to={'/register'} style={{ textDecoration: "none", color: "black" }}>Daftar Disini</Link></p>
                            </div>
                        </form>
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
export default connect(mapStateToProps)(login)