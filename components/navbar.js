import React from 'react';

class NavBar extends React.Component {

    render() {
        return (
            <div className="navbar">
                {this.renderNavItems()}
            </div>
        );
    }

    renderNavItems() {
        var items = ['browse games', 'community', 'support', 'my account'];

        return (
            <div className="navbar--items-container">
                {this.renderLogo()}
                {items.map(this.renderNavItem)}
            </div>
        );
    }

    renderLogo() {
        return (
            <a href="#" className="navbar--items-container-logo">
                <div className="navbar--items-container-logo-image"/>
            </a>
        );
    }

    renderNavItem(item, index) {
        return (
            <a key={index} href="#" className="navbar--items-container-item">
                <span className="item-text">
                    {item}
                </span>
            </a>
        );
    }
}

export default NavBar;

