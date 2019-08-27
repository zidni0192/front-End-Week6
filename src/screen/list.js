import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function text(text) {
    if (text.length > 20) {
        let textSplit = text.substr(0, 20)
        return `${textSplit} ...`
    } else {
        let textSplit = text
        return `${textSplit}`
    }
}
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: this.props.search
        }
    }
    render() {
        const book = this.props.search
        console.log(book)
        return (
            !book.isFulfilled ? <div style={{marginTop:300,textAlign:"center"}}>Loading</div> :
            <div className="list">
                {localStorage.id ? localStorage.role === "User" ? "" : <button className="add" onClick={this.props.showModal}>{"ADD"}</button> : <button className="add" onClick={this.props.showModal}>{"DONASI"}</button>}
                <div className="list-item">
                    {
                        !book.bookList ? "" : !book.bookList.result.length > 0 ? "" : book.bookList.result.map(
                            (item) => {
                                const tersedia =
                                    <Link to={`/${item.bookid}`}>
                                        <div className="item" id="items" bookid={item.bookid}>
                                            <div style={{ padding: 0, position: "relative" }}>
                                                <div style={{ padding: 0, height: "200px", borderRadius: 10, background: 'black' }}>
                                                    <img src={item.image_url} alt="gambar" />
                                                </div>
                                                <p style={{ position: "absolute", bottom: 10, right: 10, width: "auto", color: "white", textShadow: "1px 1px 1px black" }}>Tersedia</p>
                                            </div>
                                            <div>
                                                <p>{text(item.title)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                const tidak =
                                    <div className="item" id="items" bookid={item.bookid}>
                                        <div style={{ padding: 0, position: "relative" }}>
                                            <div style={{ padding: 0, height: "200px", borderRadius: 10, background: 'black' }}>
                                                <img src={item.image_url} alt="gambar" />
                                            </div>
                                            <p style={{ position: "absolute", bottom: 10, right: 10, width: "auto", color: "white", textShadow: "1px 1px 1px black" }}>Tidak Tersedia</p>
                                        </div>
                                        <div>
                                            <p>{text(item.title)}</p>
                                        </div>
                                    </div>
                                if (item.status) {
                                    return (tidak)
                                } else {
                                    return (tersedia)
                                }
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.book,
        user: state.user
    }
}

export default connect(mapStateToProps)(List)