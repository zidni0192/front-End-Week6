import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { register } from '../publics/redux/action/user'
import ModalAlert from './ModalAlert';
import { connect } from 'react-redux';
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: ""
        }
    }
    setModal = () => {
        this.setState({ modal: "" })
    }
    register = async (e) => {
        e.preventDefault()
        if (document.getElementById('password').value === document.getElementById('confirm_password').value) {
            await this.props.dispatch(register({
                no_ktp: document.getElementById('no_ktp').value,
                fullname: document.getElementById('nama_lengkap').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            }))
            if (this.props.user.userList.code === "ER_DUP_ENTRY") {
                const modal = <ModalAlert show={true} pesan={"Maaaf Email Sudah Terdaftar"} error={true} link={"/register"} setModal={this.setModal} />
                this.setState({ modal: modal })
            } else {
                const modal = <ModalAlert show={true} pesan={"Register Sukses"} success={true} link={"/"} setModal={this.setModal} />
                this.setState({ modal: modal })
            }    
        } else {
            const modal = <ModalAlert show={true} pesan={"Password dan confirm Password Harus sama"} error={true} link={"/register"} setModal={this.setModal} />
            this.setState({ modal: modal })
        }
    }

    render() {
        return (
            <div>
                {this.state.modal}
                <div style={{ marginBottom: 100, borderRadius: 5, width: 500, marginLeft: "50%", transform: "translateX(-50%)", overflow: "hidden", boxShadow: "0.5px 0.5px 2px #ddd", paddingBottom: 20 }}>
                    <div style={{ padding: "10px 40px", width: "100%", boxSizing: "border-box", boxShadow: "0.5px 0.5px 2px #ddd" }}>
                        <h2>Register</h2>
                    </div>
                    <div style={{ padding: "10px 40px", width: "100%", overflow: "hidden", boxSizing: "border-box", boxShadow: "0px 0px 0.1px #ddd" }}>
                        <form onSubmit={this.register}>
                            <div>
                                <p>Nomor KTP</p>
                                <input style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'no_ktp'} required />
                            </div>
                            <div>
                                <p>Nama Lengkap</p>
                                <input style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'nama_lengkap'} required />
                            </div>
                            <div>
                                <p>Email</p>
                                <input type='email' autocomplete="off" style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'email'} required />
                            </div>
                            <div>
                                <p>Password</p>
                                <input type={"password"} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'password'} required />
                            </div>
                            <div>
                                <p>Confirm Password</p>
                                <input type={'password'} style={{ padding: "10px 20px", fontSize: "10pt", borderRadius: 5, border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }} id={'confirm_password'} required />
                            </div>
                            <div>
                                <p></p>
                                <button style={{ padding: 15, width: "100%", borderRadius: '5px', border: "0px", backgroundColor: "#24f555", color: "white", fontSize: "15pt", cursor: "pointer" }}>Register</button>
                                <p>Sudah Punya akun ? <Link to={'/login'} style={{ textDecoration: "none", color: "black" }}>Login Disini</Link></p>
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
export default connect(mapStateToProps)(Register)