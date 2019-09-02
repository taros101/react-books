import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import TablePagination from '@material-ui/core/TablePagination';
import { BookTypes } from '../../types/bookTypes'
import { UserTypes } from '../../types/userTypes'

export interface AdminProps {
  usersBase: UserTypes[];
  modal: boolean;
  snackbarOpen: boolean;
  errors: string;
  books: BookTypes[];
  addBookModal: boolean;
  history: {};
  admin: any;
  booksStore: any;
  modalClose: () => void;
  modalOpen: () => void;
  snackbarClose: () => void;
  addBookModalOpen: () => void;
  addBookModalClose: () => void;
}

export interface AdminState {
  email: string;
  password: string;
  editId: number;
  bookTitle: string,
  bookAuthor: string;
  bookDescription: string;
  bookPrice: string;
  bookCover: string;
  rowsBookPerPage: number;
  pageBook: number;
  rowsUserPerPage: number;
  pageUser: number;
}

export class AdminComponent extends React.Component<AdminProps, AdminState>{
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      editId: 0,
      bookTitle: '',
      bookAuthor: '',
      bookDescription: '',
      bookPrice: '',
      bookCover: '',
      rowsBookPerPage: 5,
      pageBook: 0,
      rowsUserPerPage: 5,
      pageUser: 0
    }

    this.handleChangeBooksPage = this.handleChangeBooksPage.bind(this);
    this.handleChangeUsersPage = this.handleChangeUsersPage.bind(this);

    this.props.admin()
    this.props.booksStore()
  }

  handleDelete = (email: string) => {
    const usersStore = this.props.usersBase
    let users:{} = {}

    usersStore.forEach(function(user: UserTypes){
      if (user.email === email) {
        users = user
      }
    })
    
    this.props.admin({usersDelete: users})
  }

  handleEdit(email: string, password: string, id: number) {
    this.props.modalOpen();
    this.setState({email: email, password: password, editId: id})
  }

  handleEditSave(email: string, password: string, id: number) {
    const usersStore = this.props.usersBase
    let users:{} = {}
    
    usersStore.forEach(function(user: {email: string, password: string, id: number}){
      if (user.id === id) {
        user.email = email
        user.password = password
        users = user
      }
    })

    this.props.admin({usersEdit: users})
    this.props.modalClose();
  }

  handleCloseModal() {
    this.props.modalClose();
  }

  handleAddBookModalOpen() {
    this.setState({bookCover: ''})
    this.props.addBookModalOpen();
  }

  handleAddBookModalClose() {
    this.props.addBookModalClose();
  }

  handleUserChanges = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  }

  handleAddBookParameters = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any);
  }

  handleAddBook() {
    const { history } = this.props;
    this.props.booksStore({
      bookTitle: this.state.bookTitle, 
      bookAuthor: this.state.bookAuthor, 
      bookDescription: this.state.bookDescription, 
      bookPrice: this.state.bookPrice,
      bookCover: this.state.bookCover,
      history
    })
  }

  addCover = (event: any) => {
    var img = '';
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (function(file) {
        return function(this: any, e: any) {
            img = e.target.result;
            this.setState({bookCover: img})
        };
    })(file).bind(this);
    if(file){
      reader.readAsDataURL(file);
    }
  }

  handleCloseSnackbar() {
    this.props.snackbarClose();
  }

  handleChangeBooksPage(event: unknown, newPage: number) {
    this.setState({pageBook: newPage})
  }

  handleChangeRowsBooksPerPage(event: any) {
    this.setState({pageBook: 0})
    this.setState({rowsBookPerPage: event.target.value})
  }

  handleChangeUsersPage(event: unknown, newPage: number) {
    this.setState({pageUser: newPage})
  }

  handleChangeRowsUsersPerPage(event: any) {
    this.setState({pageUser: 0})
    this.setState({rowsUserPerPage: event.target.value})
  }

  render() {
    const usersBase = this.props.usersBase
    const booksStore = this.props.books
    return (
      <div>
        <h2>Админка</h2>
        <Grid container spacing={2} style={{width: "100%", margin: "0 auto"}}>
          <Grid item xs={12} lg={6}>
            <Paper style={{margin: "0 20px", overflowX: "auto"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Пользователь</TableCell>
                    <TableCell align="center">Пароль</TableCell>
                    <TableCell align="center">Тип пользователя</TableCell>
                    <TableCell align="right">Редактировать/Удалить</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersBase
                  .slice(this.state.pageUser * this.state.rowsUserPerPage, this.state.pageUser * this.state.rowsUserPerPage + this.state.rowsUserPerPage)
                  .map((user: UserTypes) => (
                    <TableRow key={user.id}>
                      <TableCell align="center">{user.id}</TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {user.email}
                      </TableCell>
                      <TableCell align="center">{user.password}</TableCell>
                      <TableCell align="center">{user.userType}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => this.handleEdit(user.email, user.password, user.id)} aria-label="delete">
                          <CreateIcon />
                        </IconButton>
                        <IconButton onClick={() => this.handleDelete(user.email)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={usersBase.length}
                  rowsPerPage={this.state.rowsUserPerPage}
                  page={this.state.pageUser}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={this.handleChangeUsersPage}
                  onChangeRowsPerPage={(event) => this.handleChangeRowsUsersPerPage(event)}
                />
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Paper style={{overflowX: "auto", margin: "0 20px"}}> 
              <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Название книги</TableCell>
                      <TableCell align="center">Автор</TableCell>
                      <TableCell align="center">Краткое описание</TableCell>
                      <TableCell align="center">Цена</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booksStore
                    .slice(this.state.pageBook * this.state.rowsBookPerPage, this.state.pageBook * this.state.rowsBookPerPage + this.state.rowsBookPerPage)
                    .map((book: BookTypes) => (
                      <TableRow key={book.id}>
                        <TableCell align="center">{book.id}</TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {book.title}
                        </TableCell>
                        <TableCell align="center">{book.author}</TableCell>
                        <TableCell align="center">{book.description}</TableCell>
                        <TableCell align="center">{book.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={booksStore.length}
                  rowsPerPage={this.state.rowsBookPerPage}
                  page={this.state.pageBook}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={this.handleChangeBooksPage}
                  onChangeRowsPerPage={(event) => this.handleChangeRowsBooksPerPage(event)}
                />
              </Paper>
              <div style={{display: "flex", justifyContent: "center"}}>
                <Button style={{marginTop: "18px"}} variant="contained" color="primary" onClick={() => this.handleAddBookModalOpen()}>
                  Добавить книгу
                </Button>
              </div>
            </Grid>
          </Grid> 

        <Dialog open={this.props.modal} onClose={() => this.handleCloseModal()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Редактировать</DialogTitle>
          <DialogContent>
            <TextField
              id="standard-name"
              label="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleUserChanges}
              margin="normal"
              style={{width: "350px"}}
            />
            <br/>
            <TextField
              id="standard-name"
              label="Пароль"
              name="password"
              value={this.state.password}
              onChange={this.handleUserChanges}
              margin="normal"
              style={{width: "350px"}}
            />
          </DialogContent>
          <DialogActions style={{justifyContent: "center", padding: "20px 8px"}}>
            <Button onClick={() => this.handleEditSave(this.state.email, this.state.password, this.state.editId)} variant="contained" color="primary">
              Сохранить
            </Button>
            <Button onClick={() => this.handleCloseModal()} color="primary" style={{marginLeft: "22px"}}>
              Отмена
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={this.props.addBookModal} onClose={() => this.handleAddBookModalClose()} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Добавить книгу</DialogTitle>
          <DialogContent>
          <TextField
              className="input"
              label="Название книги"
              margin="normal"
              name="bookTitle"
              value={this.state.bookTitle}
              onChange={this.handleAddBookParameters}
            />
            <TextField
              className="input"
              label="Автор"
              margin="normal"
              name="bookAuthor"
              value={this.state.bookAuthor}
              onChange={this.handleAddBookParameters}
            />
            <TextField
              className="input"
              label="Краткое описание"
              margin="normal"
              name="bookDescription"
              multiline
              rows="4"
              value={this.state.bookDescription}
              onChange={this.handleAddBookParameters}
            />
            <TextField
              className="input"
              label="Цена"
              margin="normal"
              name="bookPrice"
              value={this.state.bookPrice}
              onChange={this.handleAddBookParameters}
            />
            <div style={{margin: "22px 0"}}>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{display: "none"}}
                onChange={(event) => this.addCover(event)}
              />
              <label htmlFor="contained-button-file">
                <Button component="span" color="primary">
                  Добавить обложку
                </Button>
              </label>
              <br />
              {
                this.state.bookCover
                ? <img src={this.state.bookCover} alt="Обложка книги"/>
                : null
              }
            </div>
          </DialogContent>
          <DialogActions style={{justifyContent: "center", padding: "20px 8px"}}>
            <Button style={{marginTop: "12px"}} variant="contained" color="primary" onClick={() => this.handleAddBook()}>
              Сохранить
            </Button>
            <Button onClick={() => this.handleAddBookModalClose()} color="primary" style={{marginLeft: "22px"}}>
              Отмена
            </Button>
          </DialogActions>
        </Dialog>
        {
            this.props.snackbarOpen
            ? <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={this.props.snackbarOpen}
                autoHideDuration={3000}
                onClose={() => this.handleCloseSnackbar()}
              >
                <SnackbarContent
                  aria-describedby="client-snackbar"
                  style={{backgroundColor: "#d32f2f"}}
                  message={
                    <span id="client-snackbar">
                      {this.props.errors}
                    </span>
                  }
                  action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={() => this.handleCloseSnackbar()}>
                      <CloseIcon />
                    </IconButton>,
                  ]}
                />
              </Snackbar>
            : ''
          }
      </div>
    )
  }
}