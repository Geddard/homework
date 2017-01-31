import React from 'react';
import NavBar from 'components/navbar';
import BundleDisplay from 'components/bundle-display';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            gamesSoldAmount: 0
        };
    }

    getChildContext() {
        return {
            addGamesSold: () => this.addGamesSold(),
            gamesSoldAmount: this.state.gamesSoldAmount
        };
    }

    render() {
        return (
            <div className="app">
                <NavBar />
                <BundleDisplay />
            </div>
        );
    }

    addGamesSold() {
        this.setState({
            gamesSoldAmount: this.state.gamesSoldAmount + 1
        });
    }
}

export default App;

App.childContextTypes = {
    addGamesSold: React.PropTypes.func,
    gamesSoldAmount: React.PropTypes.number
};

