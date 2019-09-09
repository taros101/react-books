import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Link } from "react-router-dom";
import './navComponent.css'
import { BookTypes, SortBookTypes } from '../../types/bookTypes'
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface NavProps {
  auth: boolean;
  email: string;
  roles: string;
  img: string;
  id: string;
  userBooks: BookTypes[];
  sortUserBooks: SortBookTypes[];
  totalPrice: number;
  isBasketLoading: boolean;
  doLogout: () => void;
  addBookToCart: (o: object) => void; 
  removeBookFromCart: (o: object) => void;
  props: any;
}

export interface NavState {
  anchorEl: any;
  bookAnchorEl: any;
}

export class NavComponent extends React.Component<NavProps, NavState>{
  constructor(props: any) {
    super(props);

    this.state = {
      anchorEl: null,
      bookAnchorEl: null
    }
  }

 handleMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({anchorEl: event.currentTarget})
  }

  handleBookMenu(event: React.MouseEvent<HTMLElement>) {
    this.setState({bookAnchorEl: event.currentTarget})
  }

  handleClose() {
    this.setState({anchorEl: null})
  }

  handleBookClose() {
    this.setState({bookAnchorEl: null})
  }

  handleAddBook(book: BookTypes) {
    const bookStore = this.props.userBooks
    const userBook = bookStore.find((item: BookTypes) => item.title === book.title);
    this.props.addBookToCart({book: userBook, email: this.props.email, img: this.props.img, userBooks: this.props.userBooks, id: this.props.id })
  }

  handleRemoveBook(book: BookTypes) {
    const bookStore = this.props.userBooks
    const userBook = bookStore.find((item: BookTypes) => item.title === book.title);
    this.props.removeBookFromCart({book: userBook, email: this.props.email, img: this.props.img, userBooks: this.props.userBooks, id: this.props.id })
  }

  logout() {
    localStorage.setItem('userAuth', JSON.stringify({
        "auth": false,
        "roles": "",
        "token": "",
        "id": ""
    }));
    this.props.doLogout()
    this.setState({anchorEl: null})
   }

  render() {
    return (
      <div>
      <AppBar position="static">
          {
            this.props.auth === false
            ? <Toolbar style={{justifyContent: "center"}}>
                <ul className="nav-list">
                    <li className="nav-list-item">
                    <Link className="nav-list-link" to="/">Home</Link>
                    </li>
                    <li className="nav-list-item">
                    <Link className="nav-list-link" to="/registration">Registration</Link>
                    </li>
                    <li className="nav-list-item">
                    <Link className="nav-list-link" to="/login">Login</Link>
                    </li>
                </ul>
              </Toolbar>
            : <Toolbar style={{justifyContent: "space-between"}}>
                <ul className="nav-list">
                    <li className="nav-list-item">
                        <Link className="nav-list-link" to="/">Home</Link>
                    </li>
                    {
                    this.props.roles === "admin"
                    ? <li className="nav-list-item">
                        <Link className="nav-list-link"to="/admin">Admin</Link>
                      </li>
                    : null
                    }
                </ul>
                <div className="ptofile-btn">
                    <Badge 
                      badgeContent={this.props.userBooks.length > 0 ? this.props.userBooks.length : 0} 
                      color="secondary" 
                      className="profile-badge"
                    >
                      <IconButton
                        aria-label="books of user"
                        aria-controls="menu-books-appbar"
                        aria-haspopup="true"
                        onClick={(e) => this.handleBookMenu(e)}
                        color="inherit"
                      >
                        <ShoppingCartIcon />
                      </IconButton>
                    </Badge>
                    <Menu
                        id="menu-books-appbar"
                        anchorEl={this.state.bookAnchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(this.state.bookAnchorEl)}
                        onClose={() => this.handleBookClose()}
                    >
                      {
                        this.props.sortUserBooks.length > 0
                        ? <div>
                            {
                              this.props.sortUserBooks.map((book: any, index: any) => 
                              <MenuItem key={index} style={{display: "flex", justifyContent: "space-between"}}>
                                <div style={{margin: "0 5px"}}>
                                {book.title}
                                </div>
                                <div>
                                  <IconButton aria-label="delete" style={{margin: "0 5px"}} onClick={() => this.handleAddBook(book)}>
                                    <AddIcon fontSize="small"/>
                                  </IconButton>
                                  {book.booksCount}
                                  <IconButton aria-label="delete" style={{margin: "0 5px"}} onClick={() => this.handleRemoveBook(book)}>
                                    <RemoveIcon fontSize="small"/>
                                  </IconButton>
                                </div>
                              </MenuItem>
                              )
                            }
                            {this.props.isBasketLoading ? <LinearProgress /> : null }
                            <hr style={{margin: 0}}/>  
                            <div style={{display: "flex", justifyContent: "space-between", padding: "10px 33px 10px 20px"}}><b>Общая цена: </b><b>{this.props.totalPrice}</b></div>
                          </div>
                        : <div style={{padding: "10px 20px"}}>
                            {
                              this.props.isBasketLoading 
                              ? <div className="progress" style={{margin: 0}}>
                                  <CircularProgress style={{width: "25px", height: "25px"}}/>
                                </div>
                              : "Корзина пуста" 
                            }
                          </div>
                      }
                    </Menu>
                    <Typography variant="h6" style={{marginRight: "10px"}}>
                      Hello {this.props.email}
                    </Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={(e) => this.handleMenu(e)}
                        color="inherit"
                    >
                      <Avatar alt="Remy Sharp" src={this.props.img} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                        }}
                        open={Boolean(this.state.anchorEl)}
                        onClose={() => this.handleClose()}
                    >
                        <MenuItem onClick={() => this.handleClose()}>
                          <Link to="/profile" className="profile-link">Profile</Link>
                        </MenuItem>
                        <MenuItem onClick={() => this.logout()}>
                          <Link to="/" className="profile-link">Logout</Link>
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
          }
      </AppBar>
    </div>
    )
  }
}