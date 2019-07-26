import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBooks } from '../publics/redux/action/book'

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
            book: []
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getBooks(""))
        this.setState({ book: this.props.book })
    }
    render() {
        const book = this.state.book.bookList
        console.log(this.props)
        console.log()
        return (
            <div className="list">
                {localStorage.id ? localStorage.role === "User"  ? "": <button className="add" onClick={this.props.showModal}>{"ADD"}</button>:<button className="add" onClick={this.props.showModal}>{"DONASI"}</button>}
                <div className="list-item">
                    {
                        !book ? "" : book.result.map(
                            (item, index) => {
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
        user:state.user
    }
}

export default connect(mapStateToProps)(List)