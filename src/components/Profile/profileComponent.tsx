import React from 'react';
import Button from '@material-ui/core/Button';
import './profileComponent.css'
import { SortBookTypes } from '../../types/bookTypes'

export interface ProfileProps {
  email: string;
  img: string;
  sortUserBooks: SortBookTypes[];
  totalPrice: number;
  profileChanges: (o: object) => void;
}

export interface ProfileState {
}

export class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  imageChange = (event: any) => {
    var img = '';
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (function(file) {
        return function(this: any, e: any) {
            img = e.target.result;
            this.props.profileChanges({
              imgChange: img, 
              userEmail: this.props.email,
              sortUserBooks: this.props.sortUserBooks,
              totalPrice: this.props.totalPrice
            });
        };
    })(file).bind(this);
    if(file){
      reader.readAsDataURL(file);
    }
  }

  render() {
    return (
      <div>
        <h2>Profile</h2>
        <img src={this.props.img} alt="Avatar" className="profile-avatar"/>
        <h3 className="profile-title">{`Hello ${this.props.email}!`}</h3>
        <div style={{display: "flex", justifyContent: "center"}}>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{display: "none"}}
            onChange={(event) => this.imageChange(event)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" color="primary">
              Изменить аватар
            </Button>
          </label>
        </div>
      </div>
    )
  }
}