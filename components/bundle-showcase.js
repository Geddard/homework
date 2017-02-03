import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';
import { gamesData } from 'bootstrap-data/divinity-bundle-data';

class BundleShowcase extends React.Component {

    constructor(props, context) {
        super();

        this.topSales = [
            18.31,
            19.50,
            18.00,
            18.50,
            18.45
        ];
        this.maxValue = 4999;
        this.maxPrice = 49.99;

        // Initial State
        this.state = {
            average: 7.67,
            averagesOverlap: false,
            bubbleInputValue: 14.99,
            rangeValue: 1499,
            top: 19.50,
            total: context.gamesSoldAmount
        };
    }

    componentDidMount() {
        this.updateRefPosition('sliderArrowDrawing', 15);
        this.updateRefPosition('sliderBubble', 200);
        this.updateAveragesPosition();
    }

    render() {
        return (
            <div className="bundle-showcase">
                {this.renderGameLogos()}
                {this.renderSliderSection()}
            </div>
        );
    }

    renderGameLogos() {
        return (
            <div className="game-logos--container">
                {gamesData.map((game, index) => this.renderGameLogoContainer(game, index))}
            </div>
        );
    }

    renderSliderSection() {
        var contentToRender = null;

        if (!this.isIE()) {
            contentToRender = (
                <div className="slider slider--container">
                    <div className="slider--container-price-limit slider--container-price-limit_min">$0.99</div>
                    {this.renderSlider()}
                    {this.renderBubbleContent()}
                    <div className="slider--container-price-limit slider--container-price-limit_max">${this.maxPrice}</div>
                </div>
            );
        } else {
            contentToRender = (
                <div className="slider slider--container">
                    <div className="slider--container-average_fixed">
                        ${this.state.average} (Average)
                    </div>
                    <div className="slider--container-average_fixed">
                        ${this.state.top.toFixed(2)} (Top 10%)
                    </div>
                    {this.renderBubbleContent('fixed')}
                </div>
            );
        }

        return contentToRender;
    }

    renderGameLogoContainer(game, index) {
        return (
            <div key={index} className="game">
                {this.renderPlusSign(index)}
                <div className={this.getGameLogoClass(index)} />
                <div className="game--description">
                    <a href="#" className="game--description-link">{game.link}</a>
                    <div className="game--description-price">{game.normalPrice}</div>
                    <div className="game--description-goodies">{game.goodies}</div>
                </div>
                {this.renderTier(index)}
            </div>
        );
    }

    renderPlusSign(index) {
        var plusSign = null;

        if (index && !this.isBelowAverage(index)) {
            plusSign = <div className="game--plus" />;
        }

        return plusSign;
    }

    renderTier(index) {
        var text;

        if (!index) {
            text = 'Below Average';
        }else if (index === 1) {
            text = 'Above Average (from $' + this.state.average + ')';
        } else if (index === 2) {
            let topPrice = this.state.top;

            if (topPrice > this.maxPrice) {
                topPrice = this.maxPrice;
            }

            text = 'Top supporter (from $' + topPrice.toFixed(2) + ')';
        }

        return (
            <div className={this.getTierClass(index)}>
                <div className="game--tier-image" />
                <div className="game--tier-text">{text}</div>
            </div>
        );
    }

    renderSlider() {
        return (
            <div className="slider--container-range-area">
                <div ref="average" className={this.getAverageClass('average')}>
                    ${this.state.average} (Average)
                </div>
                <div ref="top" className={this.getAverageClass()}>
                    ${this.state.top.toFixed(2)} (Top 10%)
                </div>
                <input {...this.getRangeProps()} />
                <div ref="sliderArrowDrawing" className="slider--arrow" />
            </div>
        );
    }

    renderBubbleContent(type) {
        return (
            <div ref="sliderBubble" className={this.getBubbleClass(type)}>
                <div className="slider--bubble-currency">$</div>
                <input {...this.getBubbleInputProps()}/>
                <button onClick={() => this.updateAverages()} className="slider--bubble-button">
                    Checkout Now
                </button>
                <div className="slider--bubble-info" />
                <div className="slider--bubble-info-text">Click the price to type in manually</div>
            </div>
        );
    }

    getGameLogoClass(index) {
        var inputValue = parseFloat(this.state.bubbleInputValue);

        return classNames({
           'game--logo': true,
           'game--logo_first': (!index),
           'game--logo_second': (index === 1),
           'game--logo_second-grayed': (index === 1 && inputValue < this.state.average),
           'game--logo_third': (index === 2),
           'game--logo_third-grayed': (index === 2 && inputValue < this.state.top) &&
            (index === 2 && inputValue !== this.maxPrice)
        });
    }

    getTierClass(index) {
        return classNames({
            'game--tier': true,
            'game--tier_locked': this.isBelowAverage(index)
        });
    }

    getBubbleClass(type) {
        return classNames({
            'slider--bubble': true,
            'slider--bubble_fixed': (type === 'fixed'),
        });
    }

    getAverageClass(type) {
        return classNames({
            'slider--container-average': true,
            'slider--container-average_raise': (type === 'average' && this.state.averagesOverlap),
        });
    }

    getRangeProps() {
        return {
            className: 'slider--range',
            max: this.maxValue,
            min: 0,
            onChange: (event) => this.updateRangeValue(event.target.value),
            ref: 'rangeRef',
            step: 1,
            type: 'range',
            value: this.state.rangeValue
        };
    }

    getBubbleInputProps() {
        return {
            className: 'slider--bubble-input',
            onChange: (event) => this.updateInputValue(event.target.value),
            type: 'text',
            value: this.state.bubbleInputValue
        };
    }

    updateRangeValue(value) {
        this.updateDrawingsPositions(value);
        this.updatePriceFromRange(value);
    }

    updateDrawingsPositions(value) {
        if (!this.isIE()) {
            this.updateRefPosition('sliderArrowDrawing', 15, value);
            this.updateRefPosition('sliderBubble', 200, value);
        }
    }

    updateAveragesPosition() {
        var refs = ['average', 'top'];

        refs.map(function (ref) {
            let parsedValue = parseFloat(this.state[ref]).toFixed(2);
            let value = parsedValue.replace('.', '');
            let valueForDot = (value > this.maxValue) ? this.maxValue : value;
            let newPosition = (valueForDot / (this.maxValue + 50)) * 100;

            if (this.refs[ref]) {
                this.refs[ref].style.left = 'calc(' + newPosition + '% - ' + 30 + 'px)';
            }
        }.bind(this));
    }

    updateAverages() {
        var inputValue = parseFloat(this.state.bubbleInputValue);
        var total = this.state.total;
        var newAverageTop = this.getTopAverage();
        var newAvg = ((this.state.average * total) + parseFloat(this.state.bubbleInputValue)) / (total + 1);
        var amountSold = 1;

        this.setState({
            average: newAvg.toFixed(2),
            averagesOverlap: this.averagesOverlap(newAvg, newAverageTop),
            top: newAverageTop,
            total: total + 1,
        }, this.updateAveragesPosition);

        if (inputValue >= this.state.average) {
            amountSold += 1;
        }

        if (inputValue >= this.state.top || inputValue === this.maxPrice) {
            amountSold += 1;
        }

        this.context.addGamesSold(amountSold);
    }

    getTopAverage() {
        var i;
        var percentage;
        var sortedArray;
        var topTen;

        for (i = 0; i < this.topSales.length; i += 1) {
            let newValue = parseFloat(this.state.bubbleInputValue);

            if (newValue >= this.state.top) {
                this.topSales.push(newValue);
                break;
            }
        }

        percentage = Math.ceil((10 * this.topSales.length) / 100);

        sortedArray = this.topSales.sort((num1, num2) => num2 - num1);

        topTen = sortedArray.slice(0, percentage);

        return (topTen.reduce((num1, num2) => num1 + num2) / topTen.length);
    }

    updateRefPosition(ref, optionalOffset, rangeValue) {
        var refToUpdate = ReactDOM.findDOMNode(this.refs[ref]);
        var rangeRef = ReactDOM.findDOMNode(this.refs.rangeRef);

        if (refToUpdate && rangeRef) {
            let value = rangeValue || rangeRef.value;
            let offsetModifier = optionalOffset || 1;

            let valueForSlider = (value > this.maxValue) ? this.maxValue : value;
            let sliderPosition = (valueForSlider / this.maxValue) * 100;
            let positionOffset = Math.round((offsetModifier * sliderPosition) / 98.65);

            refToUpdate.style.left = 'calc(' + sliderPosition + '% - ' + positionOffset + 'px)';
        }
    }

    updatePriceFromRange(value) {
        var priceValue = (value / 100);

        if (!priceValue) {
            priceValue = 0.99;
        }

        this.setState({
            bubbleInputValue: parseFloat(priceValue).toFixed(2),
            rangeValue: value
        });
    }

    updateInputValue(value) {
        var reg = /^([0-9]+((.)[0-9]{0,2}))$/;
        var parsedValue = parseFloat(value.replace('.', ''));

        if (reg.test(value)) {
            value = parseFloat(value).toFixed(2);
            parsedValue = parseFloat(value.replace('.', ''));

            this.setState({
                bubbleInputValue: value,
                rangeValue: parsedValue
            }, () => this.updateDrawingsPositions(parsedValue));
        }
    }

    averagesOverlap(average, top) {
        var minDifference = 5;

        return (top - average) <= minDifference ||
            (this.maxPrice - average) < minDifference && (this.maxPrice - top) < minDifference;
    }

    isBelowAverage(index) {
        var inputValue = parseFloat(this.state.bubbleInputValue);

        return ((index === 1 && inputValue < this.state.average) ||
                ((index === 2 && inputValue < this.state.top) && (index === 2 && inputValue !== this.maxPrice)));
    }

    isIE() {
        var isOldIe = (navigator.userAgent.toLowerCase().indexOf('msie') != -1);

        return isOldIe || (!!window.MSInputMethodContext && !!document.documentMode);
    }
}

export default BundleShowcase;

BundleShowcase.contextTypes = {
    addGamesSold: React.PropTypes.func,
    gamesSoldAmount: React.PropTypes.number
};
