import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postPinjam } from '../publics/redux/action/pinjam'
import { Link } from 'react-router-dom'
class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: []
        }
    }
    pinjam = async (e) => {
        e.preventDefault()
        await this.props.dispatch(postPinjam({
            id_user: localStorage.id,
            id_book: this.props.match.params.bookid,
        }
        ))
        this.props.hideModalPinjam()
    }
    render() {
        const book = this.props.book.bookEdit.result
        return (
            <div className={this.props.modalPinjam ? "modal display-block" : "modal display-none"}>
                <section className="modal-main">
                    <button onClick={this.props.hideModalPinjam} className={'close'}>X</button>
                    <p>{`Pinjam`}</p>
                    <div style={{ marginBottom: 100 }}>
                        <form onSubmit={this.pinjam}>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Card ID</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Card ID ..." id={'card_id'} name="card_id" value={localStorage.card_id} disabled required/>
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Nama Peminjam</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Name ..." id={'name'} value={localStorage.fullname} disabled name="name" required/>
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Book Name</p>
                                </div>
                                <div className="input">
                                    <input type="text" disabled value={book ? book.title : ""} name="bookName" required />
                                </div>
                            </div>
                            <div>
                                <a href="/"><button className="save">Save</button></a>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.book,
    }
}
export default connect(mapStateToProps)(Modal)