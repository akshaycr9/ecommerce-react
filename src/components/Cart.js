import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addQuantity, removeQuantity, remove } from "../actions";

class Cart extends Component {
  handleAddQuantity = id => {
    this.props.addQuantity(id);
  };

  handleRemoveQuantity = id => {
    this.props.removeQuantity(id);
  };

  // handleRemove = id => {
  //   this.props.remove(id);
  // };

  render() {
    let addedItems = this.props.items.length ? (
      this.props.items.map(item => {
        return (
          <li className="collection-item avatar" key={item.id}>
            <div className="item-img">
              <img src={item.image_url} alt={item.name} className="" />
            </div>

            <div className="item-desc">
              <span className="title">{item.name}</span>
              <p>{item.description}</p>
              <p>
                <b>Price: {item.price}$</b>
              </p>
              <p>
                <b>Quantity: {item.quantity}</b>
              </p>
              <div className="add-remove">
                <Link to="/cart">
                  <i
                    onClick={this.handleAddQuantity(item.id)}
                    className="material-icons"
                  >
                    arrow_drop_up
                  </i>
                </Link>
                <Link to="/cart">
                  <i
                    onClick={this.handleRemoveQuantity(item.id)}
                    className="material-icons"
                  >
                    arrow_drop_down
                  </i>
                </Link>
              </div>
              <button
                // onClick={this.handleRemove(item.id)}
                className="waves-effect waves-light btn pink remove"
              >
                Remove
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <p>Nothing.</p>
    );
    return (
      <div className="container">
        <div className="cart">
          <h5>You have ordered:</h5>
          <ul className="collection">{addedItems}</ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.cart.addedItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addQuantity: id => dispatch(addQuantity(id)),
    removeQuantity: id => dispatch(removeQuantity(id))
    // remove: id => dispatch(remove(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
