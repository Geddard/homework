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
                <div className="slider slider--container">
                    <div className="slider--container-price-limit slider--container-price-limit_min">$0.99</div>
                    {this.renderSliderSection()}
                    {this.renderBubbleContent()}
                    <div className="slider--container-price-limit slider--container-price-limit_max">${this.maxPrice}</div>
                </div>
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

    renderGameLogoContainer(game, index) {
        return (
            <div key={index} className="game">
                {this.renderPlusSign(index)}
                <div className={this.getGameLogoClass(game, index)} />
                <div className="game--description">
                    <a href="#" className="game--description-link">{game.link}</a>
                    <div className="game--description-price">{game.normalPrice}</div>
                    <div className="game--description-goodies">{game.goodies}</div>
                </div>
                <div className="game--tier"></div>
            </div>
        );
    }

    renderPlusSign(index) {
        var plusSign = null;
        var inputValue = parseFloat(this.state.bubbleInputValue);

        if (index === 1 && inputValue > this.state.average ||
            index === 2 && inputValue > this.state.top) {
            plusSign = <div className="game--plus" />;
        }

        return plusSign;
    }

    renderSliderSection() {
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

    renderBubbleContent() {
        return (
            <div ref="sliderBubble" className="slider--bubble">
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

    getGameLogoClass(game, index) {
        return classNames({
           'game--logo': true,
           'game--logo_first': !index,
           'game--logo_second': index === 1,
           'game--logo_third': index === 2,
        });
    }

    getPlusSignClass(type) {
        return classNames({

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
        this.updateRefPosition('sliderArrowDrawing', 15, value);
        this.updateRefPosition('sliderBubble', 200, value);
    }

    updateAveragesPosition() {
        var refs = ['average', 'top'];

        refs.map(function (ref) {
            let parsedValue = parseFloat(this.state[ref]).toFixed(2);
            let value = parsedValue.replace('.', '');
            let valueForDot = (value > this.maxValue) ? this.maxValue : value;
            let newPosition = (valueForDot / (this.maxValue + 50)) * 100;

            this.refs[ref].style.left = 'calc(' + newPosition + '% - ' + 30 + 'px)';
        }.bind(this));
    }

    updateAverages() {
        var total = this.state.total;
        var newAverageTop = this.getTopAverage();
        var newAvg = ((this.state.average * total) + parseFloat(this.state.bubbleInputValue)) / (total + 1);

        this.setState({
            average: newAvg.toFixed(2),
            averagesOverlap: this.averagesOverlap(newAvg, newAverageTop),
            top: newAverageTop,
            total: total + 1,
        }, this.updateAveragesPosition);

        this.context.addGamesSold();
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

        if (refToUpdate) {
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
}

export default BundleShowcase;

BundleShowcase.contextTypes = {
    addGamesSold: React.PropTypes.func,
    gamesSoldAmount: React.PropTypes.number
};
