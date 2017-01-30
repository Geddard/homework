import classNames from 'classnames';
import React from 'react';
import ReactDOM from 'react-dom';

class BundleShowcase extends React.Component {

    constructor() {
        super();

        this.state = {
            average: 7.67,
            bubbleInputValue: 14.99,
            rangeValue: 1499,
            top: 18.31
        };

        this.maxValue = 4999;
    }

    componentDidMount() {
        this.updateRefPosition('sliderArrowDrawing', 15);
        this.updateRefPosition('sliderBubble', 200);
        this.updateAveragesPosition();
    }

    render() {
        return (
            <div className="bundle-showcase">
                <div className="slider slider--container">
                    <div className="slider--container-price-limit slider--container-price-limit_min">$0.99</div>
                    {this.renderSliderSection()}
                    {this.renderBubbleContent()}
                    <div className="slider--container-price-limit slider--container-price-limit_max">$49.99</div>
                </div>
            </div>
        );
    }

    renderSliderSection() {
        var nodeToRender = null;

        if (!this.isOldIE()) {
            nodeToRender = (
                <div className="slider--container-range-area">
                    <div ref="average" className="slider--container-average">
                        ${this.state.average} (Average)
                    </div>
                    <div ref="top" className="slider--container-average">
                        ${this.state.top} (Top 10%)
                    </div>
                    <input {...this.getRangeProps()} />
                    <div ref="sliderArrowDrawing" className="slider--arrow" />
                </div>
            );
        }

        return nodeToRender;
    }

    renderBubbleContent() {
        return (
            <div ref="sliderBubble" className={this.getBubbleClass()}>
                <div className="slider--bubble-currency">$</div>
                <input {...this.getBubbleInputProps()}/>
                <button className="slider--bubble-button">Checkout Now</button>
            </div>
        );
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
            onChange: (event) => this.updatePriceFromInput(event.target.value),
            type: 'text',
            value: this.state.bubbleInputValue
        };
    }

    getBubbleClass() {
        return classNames({
            'slider--bubble': true,
            'slider--bubble_floating': !this.isOldIE()
        });
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
        var dotOffset = 15;

        refs.map(function (ref) {
            let value = this.state[ref].toString().replace('.', '');
            let newPosition = (value / this.maxValue) * 100;

            this.refs[ref].style.left = 'calc(' + newPosition + '% - ' + 15 + 'px)';
        }.bind(this));
    }

    updateRefPosition(ref, optionalOffset, rangeValue) {
        var refToUpdate = ReactDOM.findDOMNode(this.refs[ref]);
        var rangeRef = ReactDOM.findDOMNode(this.refs.rangeRef);

        if (refToUpdate) {
            let value = rangeValue || rangeRef.value;
            let offsetModifier = optionalOffset || 1;

            let sliderPosition = (value / this.maxValue) * 100;
            let positionOffset = Math.round(offsetModifier * sliderPosition / 99.6);

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

    updatePriceFromInput(value) {
        var reg = /^([0-9]{0,2}((.)[0-9]{0,2}))$/;
        var parsedValue = parseFloat(value.replace('.', ''));

        if (parsedValue > this.maxValue) {
            parsedValue = this.maxValue;
            value = '49.99';
        }

        if (reg.test(value)) {
            value = parseFloat(value).toFixed(2);
            parsedValue = parseFloat(value.replace('.', ''));

            this.setState({
                bubbleInputValue: value,
                rangeValue: parsedValue
            }, () => this.updateDrawingsPositions(parsedValue));
        }
    }

    isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }

    isOldIE() {
        return (navigator.userAgent.indexOf('MSIE') != -1 ) || !!document.documentMode;
    }
}

export default BundleShowcase;

