import classNames from 'classnames';
import React from 'react';
import { footerData } from 'bootstrap-data/divinity-bundle-data';

class BundleFooter extends React.Component {

    render() {
        return (
            <div className="bundle-footer">
                {this.renderGoodies()}
                {this.renderGoals()}
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
                    {footerData.goodies.items.map((item, index) => this.renderGoodie(item, index))}
                </div>
            </div>
        );
    }

    renderGoals() {
        return (
            <div className="footer-goals">
                <div className="footer-goals--title">
                    <div className="footer-goals--title-text">
                        {footerData.gamesSold.title}
                    </div>
                    <div>
                        022576
                    </div>
                </div>
            </div>
        );
    }

    renderGoodie(item, index) {
        return (
            <div className="item">
                <div className={this.getIconClass(item.icon)} />
                <div className="item--title">
                    {item.title}
                </div>
                <div className="item--subtitle">
                    {item.subTitle}
                </div>
            </div>
        );
    }

    getIconClass(icon) {
        return classNames('item--icon', 'item--icon_' + icon);
    }
}

export default BundleFooter;

