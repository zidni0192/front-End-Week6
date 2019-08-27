import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../publics/redux/action/user';

class user extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pinjam: []
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getUsers(localStorage.token, localStorage.id))
        this.setState({
            pinjam: this.props.pinjam
        })
    }
    showModal = (e) => {
        this.props.showModalKembalikan(e.currentTarget.id)
    }
    render = () => {

        return (
            <div style={{ width: "70%", marginLeft: "15%", marginBottom: 200, overflow: "hidden" }}>
                <div style={{ marginBottom: "50px", overflow: "hidden" }}>
                    <div style={{ width: "50%", float: "left", overflow: "hidden" }}>
                        <h1>List User</h1>
                    </div>
                    {/* <div style={{ width: "50%", float: "left", overflow: "hidden" }}>
                        <input style={{ borderRadius: "10px", border: "1px solid black", outline: "none", margin: "21px 0px", height: 43, fontSize: "12pt", padding: "0px 10px", float: "right", width: "60%" }} placeholder={'Cari Nama'} />
                    </div> */}
                </div>
                <div style={{ clear: "both" }}>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px", borderLeft: "1px solid black" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>No KTP</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Email</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>NamaLengkap</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Role</p>
                    </div>
                    <div style={{ width: "19%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px", borderRight: "1px solid black" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Action</p>
                    </div>
                </div>
                {/* {!pinjam ? "" : pinjam.result.map(item => {
                    return (
                        <div style={{ clear: "both" }}>
                            <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", display: "table", height: "70px", borderLeft: "1px solid black" }}>
                                <p style={{ display: "table-cell", verticalAlign: "middle" }}>{item.fullname}</p>
                            </div>
                            <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", display: "table", height: "70px" }}>
                                <p style={{ display: "table-cell", verticalAlign: "middle" }}>{item.title}</p>
                            </div>
                            <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", display: "table", height: "70px" }}>
                                <p style={{ display: "table-cell", verticalAlign: "middle" }}>{convert(item.borrowed_at)}</p>
                            </div>
                            <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", display: "table", height: "70px" }}>
                                <p style={{ display: "table-cell", verticalAlign: "middle" }}>{convert(item.expired_at)}</p>
                            </div>
                            {localStorage.id && localStorage.role === "Librarian" ? <div style={{ width: "19%", float: "left", textAlign: "center", borderBottom: "1px solid black", height: "70px", borderRight: "1px solid black", display: "table" }}>
                                <button id={item.id} style={{ margin: "15px", height: "40px", width: "80%", borderRadius: "10px", border: "1px solid black", background: "white", cursor: "pointer", outline: "none" }} onClick={this.showModal}>Kembalikan</button>
                            </div>
                                : <div style={{ width: "19%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderRight: "1px solid black", display: "table", height: "70px" }}>
                                    <p style={{ display: "table-cell", verticalAlign: "middle" }}>{item.penalty}</p>
                                </div>}
                        </div>
                    )
                })} */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(user)