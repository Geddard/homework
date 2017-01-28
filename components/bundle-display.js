import BundleHeader from 'components/bundle-header';
import BundleFooter from 'components/bundle-footer';
import React from 'react';

class BundleDisplay extends React.Component {

    render() {
        return (
            <div className="bundle-display">
                <BundleHeader />
                <BundleFooter />
            </div>
        );
    }
}

export default BundleDisplay;

