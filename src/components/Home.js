import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItems, addToCart } from "../actions";

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

  handleClick = id => {
    this.props.addToCart(id);
  };

  render() {
    const list = this.props.items.map(item => {
      return (
        <div className="card" key={item.id}>
          <div className="card-image">
            <img src={item.image_url} alt={item.name} />
            <span
              to="/"
              className="btn-floating halfway-fab waves-effect waves-light red"
              onClick={() => {
                this.handleClick(item.id);
              }}
            >
              <i className="material-icons">add</i>
            </span>
          </div>

          <div className="card-content">
            <h5>{item.name}</h5>
            <p>{item.description}</p>
            <p>
              <b>Price: {item.price}$</b>
            </p>
          </div>
        </div>
      );
    });

    if (this.props.error) {
      return <div>{this.props.error}</div>;
    } else if (this.checkEmptyObject(this.props.items)) {
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
    items: state.items.items,
    error: state.items.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchItems: () => dispatch(fetchItems()),
    addToCart: id => dispatch(addToCart(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
