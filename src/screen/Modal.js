import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postBook } from '../publics/redux/action/book'
import { getCategories } from '../publics/redux/action/category'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: []
        }
        console.log(props)
    }
    componentDidMount = async () => {
        await this.props.dispatch(getCategories())
        this.setState({
            category: this.props.category
        })
    }
    add = (e) => {
        e.preventDefault()
        this.props.dispatch(postBook({
            writer: document.getElementById('writer').value,
            description: document.getElementById('description').value,
            title: document.getElementById('title').value,
            image_url: document.getElementById('image_url').value,
            location: document.getElementById('location').value,
            category_id: document.getElementById('category').value,
        }
        ))
        document.getElementById('writer').value = ""
        document.getElementById('description').value = ""
        document.getElementById('title').value = ""
        document.getElementById('image_url').value = ""
        document.getElementById('location').value = ""
        this.props.handleClose()
    }
    render() {
        const category = this.state.category.categoryList
        return (
            <div className={this.props.show ? "modal display-block" : "modal display-none"}>
                <section className="modal-main">
                    <button onClick={this.props.handleClose} className={'close'}>X</button>
                    <p>{localStorage.id ? `Add Data` : `Donasi`}</p>
                    <div style={{ marginBottom: 100 }}>
                        <form onSubmit={this.add}>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Url Image</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Url Image ..." id={'image_url'} name="image_url" required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Title</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Title ..." id={'title'} name="title" required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Writer</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Writer ..." id={'writer'} name="writer" required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Location</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Location ..." id={'location'} name="location" required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Category</p>
                                </div>
                                <div className="input">
                                    <select id={'category'} name="category" required>
                                        {!category ? "" : category.result.map((item, index) => {
                                            return (
                                                <option value={item.categoryid}>{item.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Description</p>
                                </div>
                                <div className="input">
                                    <textarea placeholder="Description" id={'description'} rows="5" name="description" required></textarea>
                                </div>
                            </div>
                            <div>
                                <button className="save">Save</button>
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
        category: state.category,
        user: state.user
    }
}
export default connect(mapStateToProps)(Modal)