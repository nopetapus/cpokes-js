import React from 'react';
import table from '../images/wood-table.jpg'
import '../css/App.css'
import HeaderBar from './header.jsx'

class ReactCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <img className ="Card"
        src={this.props.imgurl}
        alt={this.props.cardname}/>;
    }
}

class ReactHand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardsPicked: []
        }
    }
    render() {
        const {cards} = this.props.cards
        const listBody = (props) => {
            const cards = props.cards.map((card, index) => { return (
                <li key={index}>
                    <ReactCard imgurl={card.imgurl} alt={card.cardname}/>
                </li>
            )})

            return cards
        };
        return listBody(cards)
    }
}

class GameSpace extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.gameActive) {
            return (
                <div className="gamespace">
                <ReactHand cards={this.props.game}/>
                </div>
            )
        } else {
            return(
                <div className='gamespace'></div>
            )
        }
    }

}

class EntryForm extends React.Component {
    constructor(props) {
        super(props);
        this.onRadialChange = this.onRadialChange.bind(this)
        this.onSubmit = this.props.onSubmit;
        this.onChange = this.props.onChange;
        this.state = {
            action: 'join'
        }
    }

    onRadialChange(e) {
        this.setState({action: e.target.value})
    }
    
    render() {
        if (this.state.action === 'join') {
            
        }
        return(
            <form>
                <div onChange={this.onRadialChange}>
                    <input type="radio" value="join" defaultChecked name="action-menu"/> Join Game
                    <input type="radio" value="create" name="action-menu"/> Create Game
                </div>
                <label>Player Name:
                    <input type="text" name="name" onChange={this.onChange}/>
                </label>
                <button type="button" value="Submit" onClick={this.onSubmit}>Submit</button>
            </form>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlayerSubmit = this.handlePlayerSubmit.bind(this);
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.state = {
            inputname: '',
            joinedGame: false,
            gameActive: false,
            gamestate: null,
        }
    }

    handlePlayerChange(event) {
        this.setState({inputname: event.target.value})
    }

    handlePlayerSubmit(event) {
        const requestBody = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ title: event})
        }
        fetch('http://localhost:3001/join', requestBody)
            .then(response => response.json())
            .then(data => this.setState({ postId: data.id}))
    }

    render() {
        var playspace
        if (!this.state.joinedGame) {
            playspace = <EntryForm onChange = {this.handlePlayerChange} onSubmit={this.handlePlayerSubmit}/>
        } else {
            playspace = <GameSpace />
        }
        return (
            <div className="container" style={{
                backgroundImage: 'url('+table+')',
                backgroundSize: "cover",
                height: "100vh",
                color: "#f5f5f5"
                }}>
                    <HeaderBar items={[{key: 'home', title: 'home', url: 'https://mikedem.dev'}, {key: 'rules', title: 'rules', url:'/rules'}]}/>
                    {playspace}
            </div>
        )
    }
}

export default App;
