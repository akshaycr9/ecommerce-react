import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItems } from "../actions";

class Home extends Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  checkEmptyObject = obj => {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }

    return true;
  };

  render() {
    const list = this.props.items.map(item => {
      return (
        <div className="card" key={item.id}>
          <div className="card-image">
            <img src={item.image_url} alt={item.name} />
            <span className="card-title">{item.name}</span>
            <span
              to="/"
              className="btn-floating halfway-fab waves-effect waves-light red"
              // onClick={() => {
              //   this.handleClick(item.id);
              // }}
            >
              <i className="material-icons">add</i>
            </span>
          </div>

          <div className="card-content">
            <p>{item.description}</p>
            <p>
              <b>Price: {item.price}$</b>
            </p>
          </div>
        </div>
      );
    });

    if (this.checkEmptyObject(this.props.items)) {
      return <div>Loading Items.....</div>;
    } else {
      return (
        <div className="container">
          <h3 className="center">Our items</h3>
          <div className="box">{list}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    items: state.items.items
  };
};

export default connect(
  mapStateToProps,
  { fetchItems }
)(Home);
