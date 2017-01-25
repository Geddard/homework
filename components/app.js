import React from 'react';
import NavBar from 'components/navbar';
import BundleDisplay from 'components/bundle-display';

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <NavBar />
                <BundleDisplay />
            </div>
        );
    }
}

export default App;

