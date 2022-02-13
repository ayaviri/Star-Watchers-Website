import React, { Component } from 'react';

class Search extends Component {
    state = {
        value: ''
    };

    getInput = (val) => {
        console.log(val.target.value);
        this.setState({ value: val.target.value });
    }

    handleSearch = () => {
        this.props.handleResult(this.state.value);
    };

    render() {
        return (
            <div>
                <h2> Input Search Term:</h2>
                <input type="text" onChange={this.getInput} />
                <button onClick={this.handleSearch}>Search</button>
            </div>
        );
    }
}

export default Search;
