import React from 'react';
import Grid from '@material-ui/core/Grid';
import BookComponent  from '../../containers/bookContainer';
import TextField from '@material-ui/core/TextField';
import './homeComponent.css'
import debounce from 'lodash/debounce'
import { BookTypes } from '../../types/bookTypes'

export interface HomeProps {
  books: BookTypes[];
  booksStore: any;
}

export interface HomeState {
  searchBook: string;
  searchedBooksArray: BookTypes[];
  searched: boolean;
}

export class HomeComponent extends React.Component<HomeProps, HomeState>{
  constructor(props: any) {
    super(props);

    this.state = {
      searchBook: '',
      searchedBooksArray: [],
      searched: false
    }
    this.props.booksStore()
  }


  searchBook = debounce(() => {
    const books = this.props.books
    const bookTitle = this.state.searchBook
    let bookArr: BookTypes[] = []
    
    books.map((book: BookTypes) => {
      if (book.title.toLowerCase().includes(bookTitle.toLowerCase())) {
        bookArr.push(book)
       }
     }
    )

    this.setState({ searchedBooksArray: bookArr})
    if (this.state.searchBook.length > 0) {
      this.setState({ searched: true})
    } else {
      this.setState({ searched: false})
    }
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
            this.state.searchedBooksArray.length > 0 ||  this.state.searched
            ? this.state.searchedBooksArray.map((book: BookTypes) => 
            <Grid item xs={12} sm={6} md={3} key={book.id}>
              <BookComponent book={book}/>
            </Grid>
            )
            :  books.map((book: BookTypes) => 
              <Grid item xs={12} sm={6} md={3} key={book.id}>
                <BookComponent book={book}/>
              </Grid>
              )
          }
        </Grid>
      </div>
    )
  }
}