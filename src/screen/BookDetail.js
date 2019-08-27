import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getBooks } from '../publics/redux/action/book'
import { getBook } from '../publics/redux/action/book'
import { deleteBook } from '../publics/redux/action/book'
import ModalAlert from './ModalAlert'
function convert(date) {
  let data = Date.parse(date)
  let newDate = new Date(data)
  let day = newDate.getDate()
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  let month = months[newDate.getMonth()]
  var year = newDate.getFullYear();
  return `${day} ${month} ${year}`
}
class BookDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      book: [],
      modal: "",
      loading: true
    }
  }
  setModal = () => {
    this.setState({ modal: "" })
  }
  componentDidMount = async () => {
    console.log(this.props)
    await this.props.dispatch(getBooks(''))
    await this.props.dispatch(getBook(this.props.match.params.bookid))
    await new Promise(resolve => setTimeout(resolve, 500))
    this.setState({
      book: this.props.book
    })
  }
  deleteData = () => {
    this.props.dispatch(deleteBook(this.props.match.params.bookid))
    this.props.showModalDelete()
  }
  pinjam = () => {
    if (this.state.loading) {
      this.state.loading = false
      if (localStorage.id) {
        this.props.showModalPinjam()
      } else {
        const modal = <ModalAlert show={true} pesan={"Login Dulu Dong"} error={true} link={"/login"} setModal={this.setModal} enabled={() => this.state.loading = true} />
        this.setState({ modal: modal })
      }
    }
  }
  render() {
    const book = this.state.book
    const bookEdit = this.state.book.bookEdit

    console.log(book)
    return (
      <div className="book-detail">
        {this.state.modal}
        <div>
          <ul>
            <li><Link to="/" className="back">&lArr;</Link></li>
            {localStorage.role === "Librarian" ? <li className="button" onClick={this.props.showModal}>Edit</li> : ""}
            {localStorage.role === "Librarian" ? <li className="button" onClick={this.deleteData}>Delete</li> : ""}
          </ul>
          <div className={'imageHeader'}>
            <img className={'imageHeader'} src={bookEdit ? bookEdit.result.image_url : ""} alt={bookEdit ? bookEdit.result.title : ""} />
          </div>
        </div>
        <div className="content">
          <img className={'imageBook'} src={bookEdit ? bookEdit.result.image_url : ""} alt={bookEdit ? bookEdit.result.title : ""} />
          <button className={"btn-pinjam"} onClick={this.pinjam}>Pinjam </button>
          <p className="title">{bookEdit ? bookEdit.result.title : ""}</p>
          <p className="date">{bookEdit ? convert(bookEdit.result.updated_at) : ""}</p>
          <p className="category">Category : {bookEdit ? bookEdit.result.category : ""}</p>
          <p className="writer"> Penulis : {bookEdit ? bookEdit.result.writer : ""}</p>
          <p className="text">{bookEdit ? bookEdit.result.description : ""}</p>
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

export default connect(mapStateToProps)(BookDetail)