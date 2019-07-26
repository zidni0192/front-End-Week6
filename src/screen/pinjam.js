import React, { Component } from 'react'
import { getPinjams } from '../publics/redux/action/pinjam'
import { connect } from 'react-redux'

function convert(date) {
    let data = Date.parse(date)
    let newDate = new Date(data)
    let day = newDate.getDate()
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    let month = months[newDate.getMonth()]
    var year = newDate.getFullYear();
    return `${day} ${month} ${year}`
}
class pinjam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pinjam: []
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getPinjams())
        this.setState({
            pinjam: this.props.pinjam
        })
    }
    showModal = (e)=>{
        this.props.showModalKembalikan(e.currentTarget.id)
    }
    render = () => {
        
        const pinjam = this.state.pinjam.pinjamList
        console.log(pinjam)
        return (
            <div style={{ width: "70%", marginLeft: "15%",marginBottom:200, overflow:"hidden" }}>
                <div style={{ marginBottom: "50px", overflow: "hidden" }}>
                    <div style={{ width: "50%", float: "left", overflow: "hidden" }}>
                        <h1>List Buku Yang Di Pinjam</h1>
                    </div>
                    {/* <div style={{ width: "50%", float: "left", overflow: "hidden" }}>
                        <input style={{ borderRadius: "10px", border: "1px solid black", outline: "none", margin: "21px 0px", height: 43, fontSize: "12pt", padding: "0px 10px", float: "right", width: "60%" }} placeholder={'Cari Nama'} />
                    </div> */}
                </div>
                <div style={{ clear: "both" }}>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px", borderLeft: "1px solid black" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Nama Peminjam</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Judul Buku</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Tanggal Pinjam</p>
                    </div>
                    <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Batas Tanggal Peminjaman</p>
                    </div>
                    <div style={{ width: "19%", float: "left", textAlign: "center", borderBottom: "1px solid black", borderTop: "1px solid black", display: "table", height: "70px", borderRight: "1px solid black" }}>
                        <p style={{ display: "table-cell", verticalAlign: "middle" }}>Pengembalian</p>
                    </div>
                </div>
                {!pinjam ? "" : pinjam.result.map(item => {
                    return (
                        <div style={{ clear: "both" }}>
                            <div style={{ width: "20%", float: "left", textAlign: "center", borderBottom: "1px solid black", display: "table", height: "70px", borderLeft: "1px solid black" }}>
                                <p style={{ display: "table-cell", verticalAlign: "middle" }}>{item.name}</p>
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
                            <div style={{ width: "19%", float: "left", textAlign: "center", borderBottom: "1px solid black", height: "70px", borderRight: "1px solid black", display: "table" }}>
                                <button id={item.id} style={{ margin: "15px", height: "40px", width: "80%", borderRadius: "10px", border: "1px solid black", background: "white", cursor: "pointer", outline: "none" }} onClick={this.showModal}>Kembalikan</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        pinjam: state.pinjam
    }
}

export default connect(mapStateToProps)(pinjam)