import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPinjam, patchPinjam } from '../publics/redux/action/pinjam'
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pinjam: []
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getPinjam(this.props.id_pinjam))
        this.setState({ pinjam: this.props.pinjam.pinjamList.result })
        
        let dateExpired = new Date(Date.parse(this.state.pinjam[0].expired_at))
        let dateReturn = new Date()
        let denda = 0

        if(dateReturn > dateExpired){
            const diffTime = (Date.UTC(dateReturn.getFullYear(), dateReturn.getMonth(), dateReturn.getDate()) - Date.UTC(dateExpired.getFullYear(), dateExpired.getMonth(), dateExpired.getDate()) )
            const diffDays = diffTime / (1000 * 60 * 60 * 24)
            denda = diffDays * 2000
        }
        await this.props.dispatch(patchPinjam({denda:denda}, this.props.id_pinjam))
        await this.props.dispatch(getPinjam(this.props.id_pinjam))
        this.setState({ pinjam: this.props.pinjam.pinjamList.result })
    }
    kembalikan = () =>{
        console.log(this.state.pinjam[0].id_book)
        this.props.dispatch(patchPinjam({status:false,id_book:this.state.pinjam[0].id_book,returned_at:new Date()}, this.props.id_pinjam))
        this.props.hideModalKembalikan()
    }
    render() {
        const pinjam = this.state.pinjam[0]
        console.log(pinjam)
        return (
            <div className={this.props.modalKembalikan ? "modal display-block" : "modal display-none"}>
                <section className="modal-main">
                    <button onClick={this.props.hideModalKembalikan} className={'close'}>X</button>
                    <p>{`Kembalikan`}</p>
                    <div style={{ marginBottom: 100 }}>
                        <div className="inputGroup">
                            <div className="label">
                                <p>Card ID</p>
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Card ID ..." id={'card_id'} disabled value={pinjam ? pinjam.card_id : ""} name="card_id" />
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="label">
                                <p>Nama Peminjam</p>
                            </div>
                            <div className="input">
                                <input type="text" placeholder="Name ..." disabled value={pinjam ? pinjam.name : ""} id={'name'} name="name" />
                            </div>
                        </div>
                        <div className="inputGroup">
                            <div className="label">
                                <p>Denda</p>
                            </div>
                            <div className="input">
                                <input type="text" disabled value={pinjam ? pinjam.penalty : ""} name="denda" />
                            </div>
                        </div>
                        <div>
                            <button className="save" onClick={this.kembalikan}>Kembalikan</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        pinjam: state.pinjam,
    }
}
export default connect(mapStateToProps)(Modal)