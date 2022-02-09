import React from "react"

class HeaderBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const menuitems = this.props.items.map((item, index) => <HeaderItem key={index} link={item.url} title={item.title} />)
        return(
            <div className='topbar'>
                {menuitems}
                <PlayerInfo player={this.props.player} />
            </div>
        )
    }
}

class HeaderItem extends React.Component {
    render() {
        if (this.props.active) {
            return <a className="menu active" href={this.props.link}>{this.props.title}</a>
        } else {
            return <a className="menu" href={this.props.link}>{this.props.title}</a>
        }
    }
}

class PlayerInfo extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.player) {
            return(
            <div className="playerbox">
                <div className="playername">{this.props.player.name}</div>
            </div>)
        } else {
            return <div className="placeholder"></div>
        }
    }
}


export default HeaderBar