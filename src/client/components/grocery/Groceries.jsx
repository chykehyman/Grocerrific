import React, { Component, Fragment } from 'react';
import {
  func, shape, bool, array
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from 'react-md-spinner';

import GroceryItemList from './GroceryItemList';
import * as groceryActions from '../../actions/groceryActions';

import validate from '../../helpers/validations';

const propTypes = {
  groceries: shape({
    isFetching: bool.isRequired,
    isProcessing: bool.isRequired,
    groceries: array.isRequired
  }).isRequired,
  actions: shape({
    fetchAllGroceries: func.isRequired,
    addGrocery: func.isRequired,
    deleteGrocery: func.isRequired,
    purchaseOrDropGrocery: func.isRequired
  }).isRequired
};

export class Groceries extends Component {
  actions = this.props.actions;

  state = {
    name: '',
    error: {},
    selectedId: '',
    action: ''
  }

  componentDidMount() {
    this.actions.fetchAllGroceries();
  }

  handleOnChange = (event) => {
    event.persist();

    this.setState(prevState => ({
      ...prevState,
      name: event.target.value
    }));
  }

  handleOnFocus = (event) => {
    event.persist();
    this.setState(prevState => ({
      error: { ...prevState.error, [event.target.name]: '' }
    }));
  }

  isValid = (name) => {
    const { error, isValid } = validate(name);
    if (!isValid) {
      this.setState(() => ({
        error
      }));
    }
    return isValid;
  }

  handleOnSubmit = (event) => {
    event.preventDefault();

    const { name } = this.state;

    if (this.isValid(name)) {
      this.actions.addGrocery(name)
        .then(() => this.setState({ name: '', error: {} }));
    }
  }

  handleOnDelete = (id) => {
    this.setState(prevState => ({
      ...prevState,
      selectedId: id,
      action: 'delete'
    }), () => this.actions.deleteGrocery(id));
  }

  handleOnPurchaseOrDrop = (id) => {
    this.setState(prevState => ({
      ...prevState,
      selectedId: id,
      action: 'purchase or drop'
    }), () => this.actions.purchaseOrDropGrocery(id));
  }

  render() {
    const { groceries: { isFetching, isProcessing, groceries } } = this.props;

    const {
      name, error, selectedId, action
    } = this.state;

    return (
      <Fragment>
        {isFetching
          ? (
            <div className="loader-container">
              <Loader size="35" className="loader-component" />
            </div>
          ) : (
            <Fragment>
              <div className="input-group mb-3 mt-4 ml-0 pl-0 col-md-5">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleOnChange}
                  onFocus={this.handleOnFocus}
                  autoComplete="off"
                  className="form-control"
                  placeholder="enter item name" />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.handleOnSubmit}
                    disabled={isProcessing}>
                    {isProcessing ? 'Adding...' : 'Add Item'}
                  </button>
                </div>
              </div>
              {error.name && <span className="field-error">{error.name}</span>}
              <GroceryItemList
                items={groceries}
                isProcessing={isProcessing}
                selectedId={selectedId}
                action={action}
                deleteItem={this.handleOnDelete}
                purchaseOrDropItem={this.handleOnPurchaseOrDrop} />
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = ({ groceries }) => ({
  groceries
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(groceryActions, dispatch)
});

Groceries.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Groceries);
