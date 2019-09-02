import React from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './bookComponent.css'
import { BookTypes } from '../../types/bookTypes'

export interface BookProps {
  userEmail: string;
  book: BookTypes;
  addBookToCart: (o: object) => void;
}

export interface BookState {
  expanded: boolean;
  userBook: {};
}

export class BookComponent extends React.Component<BookProps, BookState>{
  constructor(props: any) {
    super(props);

    this.state = {
      userBook: {},
      expanded: false
    }
  }

  addBook(book: {}) {
    this.setState({ userBook: book })

    this.props.addBookToCart({book: book, userEmail: this.props.userEmail})
  }

  handleExpandClick() {
    this.setState({expanded: !this.state.expanded})
  }

  render() {
    return (
      <Card>
      <CardMedia
        style={{height: 0,paddingTop: '56.25%', backgroundSize: "contain"}}
        image={this.props.book.cover}
        title="Book cover"
      />
      <CardContent>
        <h3 className="card-title">{this.props.book.title}</h3>
        <h5 className="card-subtitle">{this.props.book.author}</h5>
        <Typography variant="body2" color="textSecondary" component="p">
          {this.props.book.description}
        </Typography>

        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit >
          <CardContent style={{padding: "16px 0"}}>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.book.description}
            </Typography>
          </CardContent>
        </Collapse>
      </CardContent>
      <CardActions disableSpacing className="book-card-action">
        <div>
          <Button variant="contained" color="primary" onClick={() => this.addBook(this.props.book)}>
            {this.props.book.price}
          </Button>
        </div>
        <IconButton
          className={clsx("expand", {
            ["expandOpen"]: this.state.expanded,
          })}
          onClick={() => this.handleExpandClick()}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
    </Card>
    )
  }
}