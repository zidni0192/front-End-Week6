import React, { Component } from 'react'
import { connect } from 'react-redux'
import { patchBook } from '../publics/redux/action/book'
import { getCategories } from '../publics/redux/action/category'
import { getBook } from '../publics/redux/action/book'

class Modal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: [],
            book: []
        }
    }
    componentDidMount = async () => {
        await this.props.dispatch(getCategories())
        await this.props.dispatch(getBook(this.props.match.params.bookid))
        this.setState({
            category: this.props.category,
            book: this.props.book.bookEdit.result
        })
    }
    changeHandle = (e) => {
        const name = e.currentTarget.name
        const val = e.currentTarget.value
        // eslint-disable-next-line
        this.state.book[name] = val
        const category = this.state.category.categoryList.result.find(item => Number(item.categoryid) === Number(this.state.book.category_id))
        // eslint-disable-next-line
        this.state.book['category'] = category.name
        this.setState((state) => ({ book: state.book }))
    }
    update = (e) => {
        e.preventDefault()
        const category = this.state.category.categoryList.result.find(item => Number(item.categoryid) === Number(this.state.book.category_id))
        this.props.dispatch(
            patchBook(
                {
                    writer: document.getElementById('writer').value,
                    description: document.getElementById('description').value,
                    title: document.getElementById('title').value,
                    image_url: document.getElementById('image_url').value,
                    location: document.getElementById('location').value,
                    category_id: document.getElementById('category_id').value,
                }
                , this.props.match.params.bookid,
                category.name
            )
        )
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
                    <p>{`Edit Data`}</p>
                    <div style={{ marginBottom: 100 }}>
                        <form onSubmit={this.update}>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Url Image</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Url Image ..." id={'image_url'} name="image_url" value={this.state.book.image_url} onChange={this.changeHandle} required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Title</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Title ..." id={'title'} name="title" value={this.state.book.title} onChange={this.changeHandle} required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Writer</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Writer ..." id={'writer'} name="writer" value={this.state.book.writer} onChange={this.changeHandle} required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Location</p>
                                </div>
                                <div className="input">
                                    <input type="text" placeholder="Location ..." id={'location'} name="location" value={this.state.book.location} onChange={this.changeHandle} required />
                                </div>
                            </div>
                            <div className="inputGroup">
                                <div className="label">
                                    <p>Category</p>
                                </div>
                                <div className="input">
                                    <select id={'category_id'} name="category_id" onChange={this.changeHandle} required>
                                        {!category ? "" : category.result.map((item, index) => {
                                            return (
                                                item.categoryid === this.state.book.category_id ?
                                                    <option selected value={item.categoryid}>{item.name}</option> : <option value={item.categoryid}>{item.name}</option>
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
                                    <textarea placeholder="Description" id={'description'} rows="5" name="description" value={this.state.book.description} onChange={this.changeHandle} required></textarea>
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
        category: state.category
    }
}
export default connect(mapStateToProps)(Modal)