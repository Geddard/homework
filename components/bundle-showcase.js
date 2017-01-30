import React from 'react';
import ReactDOM from 'react-dom';

class BundleShowcase extends React.Component {

    constructor() {
        super();

        this.state = {
            bubbleInputValue: 14.99
        };
    }

    componentDidMount() {
        this.updateRefPosition('sliderArrowDrawing', 15);
        this.updateRefPosition('sliderBubble', 201);
    }

    render() {
        return (
            <div className="bundle-showcase">
                {this.renderSliderSection()}
            </div>
        );
    }

    renderSliderSection() {
        return (
            <div className="slider slider--container">
                <div className="slider--container-range-area">
                    <input {...this.getRangeProps()} />
                    {this.renderArrowDrawing()}
                </div>
                <div ref="sliderBubble" className="slider--bubble">
                    <div className="slider--bubble-currency">$</div>
                    <input {...this.getBubbleInputProps()}/>
                    <button className="slider--bubble-button">Checkout Now</button>
                </div>
            </div>
        );
    }

    renderArrowDrawing() {
        return (!this.isFirefox()) ? <div ref="sliderArrowDrawing" className="slider--arrow" /> : null;
    }

    getRangeProps() {
        return {
            className: 'slider--range',
            max: 499,
            min: 0,
            onChange: (event) => this.updateRangeValue(event),
            ref: 'rangeRef',
            step: 1,
            type: 'range'
        };
    }

    getBubbleInputProps() {
        return {
            className: 'slider--bubble-input',
            onChange: (event) => this.updatePrice(event),
            type: 'text',
            value: this.state.bubbleInputValue
        };
    }

    updateRangeValue(event) {
        var value = event.target.value;

        this.updateRefPosition('sliderArrowDrawing', 15, value);
        this.updateRefPosition('sliderBubble', 201, value);
    }

    updateRefPosition(ref, optionalOffset, rangeValue) {
        var refToUpdate = ReactDOM.findDOMNode(this.refs[ref]);
        var rangeRef = ReactDOM.findDOMNode(this.refs.rangeRef);

        if (refToUpdate) {
            let value = rangeValue || rangeRef.value;
            let offsetModifier = optionalOffset || 0;

            let sliderPosition = (value / 499) * 100;
            let positionOffset = Math.round(offsetModifier * sliderPosition / 100);

            refToUpdate.style.left = 'calc(' + sliderPosition + '% - ' + positionOffset + 'px)';
        }
    }

    updatePrice(event) {
        var reg = /^\$?[0-9]+(\.[0-9][0-9])?$/;
        var value = event.target.value;

        if (reg.test(value)) {
            this.setState({
                bubbleInputValue: event.target.value
            });
        }
    }

    isFirefox() {
        return typeof InstallTrigger !== 'undefined';
    }
}

export default BundleShowcase;

