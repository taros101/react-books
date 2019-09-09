import React from 'react';
import Grid from '@material-ui/core/Grid';
import BookComponent  from '../../containers/bookContainer';
import TextField from '@material-ui/core/TextField';
import './homeComponent.css'
import debounce from 'lodash/debounce'
import CircularProgress from '@material-ui/core/CircularProgress';
import { BookTypes } from '../../types/bookTypes'

export interface HomeProps {
  books: BookTypes[];
  booksStore: any;
  searchBook: any;
}

export interface HomeState {
  searchBook: string;
  searchedBooksArray: BookTypes[];
}

export class HomeComponent extends React.Component<HomeProps, HomeState>{
  constructor(props: any) {
    super(props);

    this.state = {
      searchBook: '',
      searchedBooksArray: []
    }
    this.props.booksStore()
  }


  searchBook = debounce(() => {
    this.props.booksStore({searchBook: this.state.searchBook})
  }, 1000)

  handleChange(e: any) {
    this.setState({searchBook: e.target.value})
    this.searchBook()
  }

  render() {
    const books = this.props.books
    return (
      <div>
        <h2>Каталог книг</h2>
        <Grid container spacing={2} style={{width: "100%", margin: "0 auto"}} className="home-container">
          <Grid item xs={12} className="home-search">
            <TextField
                label="Поиск книги"
                type="search"
                margin="normal"
                value={this.state.searchBook}
                onChange={(e) => this.handleChange(e)}
                style={{width: "45%", marginBottom: "16px"}}
            />
          </Grid>
          {
            books.length > 0
            ?  books.map((book: BookTypes) => 
                <Grid item xs={12} sm={6} md={3} key={book._id}>
                  <BookComponent book={book}/>
                </Grid>
              )
            : this.state.searchBook
              ? <p style={{margin: "0 auto"}}>Ничего не найдено</p>
              : <div className="progress" style={{width: "100%"}}>
                  <CircularProgress />
                </div>
          }
          
        </Grid>
      </div>
    )
  }
}