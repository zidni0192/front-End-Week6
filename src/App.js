import React, { Component } from 'react'
import './App.css'
import Nav from './screen/Navbar'
import Search from './screen/search'
import List from './screen/list'
import Data from './data'
import Pinjam from './screen/pinjam'
import SearchList from './screen/searchList'
import BookDetail from './screen/BookDetail'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Modal from './screen/Modal'
import ModalEdit from './screen/ModalEdit'
import ModalPinjam from './screen/ModalPinjam'
import ModalKembalikan from './screen/ModalKembalikan'
import ModalDelete from './screen/ModalDelete'
import { Provider } from 'react-redux'
import store from './publics/redux/store'
import Login from './screen/login'
import Register from './screen/register'

class App extends Component {
  constructor() {
    super()
    this.state = { Data, show: false, idPinjam: 0, modalPinjam: false, modalKembalikan: false, modalDelete: false, search: [], searching: false }
  }
  showModal = () => {
    this.setState({ show: true })
  }
  hideModal = () => {
    this.setState({ show: false })
  }
  showModalDelete = () => {
    this.setState({ modalDelete: true })
  }
  hideModalDelete = () => {
    this.setState({ modalDelete: false })
  }
  showModalPinjam = () => {
    this.setState({ modalPinjam: true })
  }
  hideModalPinjam = () => {
    this.setState({ modalPinjam: false })
  }
  showModalKembalikan = (id) => {
    this.setState({ modalKembalikan: true, idPinjam: id })
  }
  hideModalKembalikan = () => {
    this.setState({ modalKembalikan: false })
  }
  setSearch = (search) => {
    this.setState({ search: search, searching: true })
  }
  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Router>
            <Switch>
              <Route exact path={"/"}>
                <Route component={Nav} />
                <Route render={() => <Search setSearch={this.setSearch} />} />
                <Route render={() => <List showModal={this.showModal} />} />
                <Route render={() => <Modal show={this.state.show} handleClose={this.hideModal} />} />
              </Route>
              <Route path={"/pinjam"}>
                <Route component={Nav} />
                <Route render={() => <Pinjam showModalKembalikan={this.showModalKembalikan} />} />
                {
                  this.state.modalKembalikan ?
                    <Route render={() => <ModalKembalikan modalKembalikan={this.state.modalKembalikan} hideModalKembalikan={this.hideModalKembalikan} id_pinjam={this.state.idPinjam} />} />
                    : ""
                }
              </Route>
              <Route path={'/login'}>
                <Route render={() => <Nav />} />
                <Route render={() => <Login />} />
              </Route>
              <Route path={'/register'}>
                <Route render={() => <Nav />} />
                <Route render={() => <Register />} />
              </Route>
              <Route path={"/:bookid"}>
                <Route render={(props) => <BookDetail showModal={this.showModal} showModalDelete={this.showModalDelete} showModalPinjam={this.showModalPinjam} {...props} />} />
                <Route render={(props) => <ModalDelete modalDelete={this.state.modalDelete} hideModalDelete={this.hideModalDelete} {...props} />} />
                <Route render={(props) => <ModalPinjam modalPinjam={this.state.modalPinjam} hideModalPinjam={this.hideModalPinjam} {...props} />} />
                <Route render={(props) => <ModalEdit show={this.state.show} handleClose={this.hideModal} {...props} />} />
              </Route>
            </Switch>
          </Router>
        </div>
      </Provider>
    )
  }
}


export default App
