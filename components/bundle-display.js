import React from 'react';
import bundleData from 'bootstrap-data/divinity-bundle-data';
import classNames from 'classnames';

class BundleDisplay extends React.Component {

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
            <div className="bundle-display">
                {this.renderHeading()}
            </div>
        );
    }

    renderHeading() {
        var headingData = bundleData.heading;

        return (
            <div className="heading">
                <span className="heading--title">
                    {headingData.title}
                </span>
                <span className="heading--bundle-name">
                    {headingData.bundleName}
                </span>
                <span className="heading--price">
                    {headingData.regularPrice}
                </span>
                <div>
                    {headingData.bundlePerks.map((perk, index) => this.renderPerk(perk, index))}
                    {this.renderClock()}
                </div>
            </div>
        );
    }

    renderPerk(perk, index) {
        return (
            <div key={index} className="heading--perk">
                <div className={this.getPerkIconClass(perk)} />
                <div className="heading--perk-text">
                    {perk.text}
                </div>
            </div>
        );
    }

    renderClock() {
        return (
            <div className="heading--clock">
                <div className="heading--clock-icon" />
                <span className="heading--clock-legend">
                    <span className="heading--clock-text">
                        Only
                    </span>
                    {this.renderTimer()}
                    <span className="heading--clock-text">
                        left
                    </span>
                </span>
            </div>
        );
    }

    renderTimer() {
        var minutes = Math.floor(this.state.time / 60)
        var hours = Math.floor(minutes / 60);
        var seconds = this.state.time %= 60;

        minutes %= 60;

        return (
            <span className="heading--clock-time">
                {this.addLeadingZero(hours) + ":" + this.addLeadingZero(minutes) + ":" + this.addLeadingZero(seconds)}
            </span>
        );
    }

    getPerkIconClass(perk) {
        return classNames('heading--perk-icon', 'heading--perk-icon_' + perk.icon)
    }

    addLeadingZero(amount) {
        return (amount > 9) ? amount : "0" + amount;
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

export default BundleDisplay;

