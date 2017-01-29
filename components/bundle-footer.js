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
            <div className="goodies">
                <div className="goodies--title">
                    <div className="goodies--title-text">
                        {footerData.goodies.title}
                    </div>
                    {footerData.goodies.items.map((item, index) => this.renderGoodie(item, index))}
                </div>
            </div>
        );
    }

    renderGoals() {
        var gamesSoldData = footerData.gamesSold;
        var currentGoalData = gamesSoldData.currentGoal;

        return (
            <div className="goals">
                <div className="goals--title">
                    <div className="goals--title-text">
                        {gamesSoldData.title}
                    </div>
                    <div className="goals--numbers" />
                    <div className="goals--current-title">
                        {currentGoalData.currentAmount}
                    </div>
                    <div className="goals--current-description">
                        {currentGoalData.goalDescription}
                    </div>
                    {this.renderThumbnailSection()}
                    <div className="goals--milestones" />
                </div>
            </div>
        );
    }

    renderGoodie(item, index) {
        return (
            <div key={index} className="item">
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

    renderThumbnailSection() {
        return (
            <div className="goals--thumbnail-section">
                <div className="goals--arrow" />
                <div className="goals--thumbnail-image" />
                <div className="goals--arrow goals--arrow_left" />
            </div>
        );
    }

    getIconClass(icon) {
        return classNames('item--icon', 'item--icon_' + icon);
    }
}

export default BundleFooter;

