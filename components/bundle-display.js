import BundleHeader from 'components/bundle-header';
import BundleFooter from 'components/bundle-footer';
import BundleShowcase from 'components/bundle-showcase';
import React from 'react';

class BundleDisplay extends React.Component {

    render() {
        return (
            <div className="bundle-display">
                <BundleHeader />
                <BundleShowcase />
                <BundleFooter />
            </div>
        );
    }
}

export default BundleDisplay;

