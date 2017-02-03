import React from 'react';
import NavBar from 'components/navbar';
import BundleDisplay from 'components/bundle-display';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            gamesSoldAmount: 980
        };
    }

    getChildContext() {
        return {
            addGamesSold: (amount) => this.addGamesSold(amount),
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

    addGamesSold(amount) {
        this.setState({
            gamesSoldAmount: this.state.gamesSoldAmount + amount
        });
    }
}

export default App;

App.childContextTypes = {
    addGamesSold: React.PropTypes.func,
    gamesSoldAmount: React.PropTypes.number
};

