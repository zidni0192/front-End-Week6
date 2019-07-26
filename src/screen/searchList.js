import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
            book: this.props.book
        }
    }
    render() {
        const book = this.props.book
        console.log(this.props)
        return (
            <div className="list">
                <button className="add" onClick={this.props.showModal}>ADD</button>
                <div className="list-item">
                    {
                        !book ? "" : book.map(
                            (item, index) => {
                                return (
                                    <Link to={`/${item.bookid}`}>
                                        <div className="item" id="items" bookid={item.bookid}>
                                            <div style={{ padding: 0, position: "relative" }}>
                                                <div style={{padding: 0, height: "200px",borderRadius: 10,background: 'black'}}>
                                                    <img src={item.image_url} alt="gambar" />
                                                </div>
                                                <p style={{ position: "absolute", bottom: 10, right: 10, width: "auto", color: "white", textShadow: "1px 1px 1px black" }}>Tersedia</p>
                                            </div>
                                            <div>
                                                {console.log(item)}
                                                <p>{text(item.title)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
    }
}

export default List