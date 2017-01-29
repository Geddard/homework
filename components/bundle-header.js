import classNames from 'classnames';
import React from 'react';
import { headerData } from 'bootstrap-data/divinity-bundle-data';

class BundleHeader extends React.Component {

    constructor() {
        super();
        this.daySeconds = 86400;
        this.state = {
            time: 86400
        };
        setInterval(() => this.countDown(), 1000);
    }

    render() {
        return (
            <div className="bundle-header">
                <span className="bundle-header--title">
                    {headerData.title}
                </span>
                <span className="bundle-header--bundle-name">
                    {headerData.bundleName}
                </span>
                <span className="bundle-header--price">
                    {headerData.regularPrice}
                </span>
                <div>
                    {headerData.bundlePerks.map((perk, index) => this.renderPerk(perk, index))}
                    {this.renderClock()}
                </div>
            </div>
        );
    }

    renderPerk(perk, index) {
        return (
            <div key={index} className="bundle-header--perk">
                <div className={this.getPerkIconClass(perk)} />
                <div className="bundle-header--perk-text">
                    {perk.text}
                </div>
            </div>
        );
    }

    renderClock() {
        return (
            <div className="bundle-header--clock">
                <div className="bundle-header--clock-icon" />
                <span className="bundle-header--clock-legend">
                    <span className="bundle-header--clock-text">
                        Only
                    </span>
                    {this.renderTimer()}
                    <span className="bundle-header--clock-text">
                        left
                    </span>
                </span>
            </div>
        );
    }

    renderTimer() {
        var minutes = Math.floor(this.state.time / 60);
        var hours = Math.floor(minutes / 60);
        var seconds = this.state.time %= 60;

        minutes %= 60;

        return (
            <span className="bundle-header--clock-time">
                {this.addLeadingZero(hours) + ':' + this.addLeadingZero(minutes) + ':' + this.addLeadingZero(seconds)}
            </span>
        );
    }

    getPerkIconClass(perk) {
        return classNames('bundle-header--perk-icon', 'bundle-header--perk-icon_' + perk.icon);
    }

    addLeadingZero(amount) {
        return (amount > 9) ? amount : '0' + amount;
    }

    countDown() {
        this.daySeconds = (this.daySeconds - 1);

        if (!this.daySeconds) {
            this.daySeconds = 86400;
        }

        this.setState({
            time: this.daySeconds
        });
    }
}

export default BundleHeader;
