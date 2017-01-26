import React from 'react';
import { footerData } from 'bootstrap-data/divinity-bundle-data';

class BundleFooter extends React.Component {

    render() {
        return (
            <div className="bundle-footer">
                {this.renderGoodies()}
            </div>
        );
    }

    renderGoodies() {
        return (
            <div className="footer-goodies">
                <div className="footer-goodies--title">
                    <div className="footer-goodies--title-text">
                        {footerData.goodies.title}
                    </div>
                </div>
            </div>
        );
    }
}

export default BundleFooter;

