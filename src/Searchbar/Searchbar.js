import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
class Searchbar extends Component {
  static defaultProps = {
    initialQuery: '',
  };
  static propTypes = {
    query: PropTypes.string,
  };
  state = {
    query: this.props.initialQuery,
  };
  handleChangeFormInput = e => {
    this.setState({ query: e.currentTarget.value });
  };
  formSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    this.props.onChangeQuery(query);
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form onSubmit={this.formSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChangeFormInput}
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            value={this.state.query}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
