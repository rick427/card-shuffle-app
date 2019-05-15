import React, {Component} from 'react';
import axios from 'axios';
import Card from './Card';
import './deck.css';
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

class Deck extends Component {
    constructor(props){
        super(props);
        this.state = {
            deck: null,
            drawn: []
        };
        this.getCard = this.getCard.bind(this);
    }

    async componentDidMount(){
      const deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
      this.setState({deck: deck.data});
    }

    async getCard(){
        //https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/
        let id = this.state.deck.deck_id;
        try{
            const CARD_URL = `${API_BASE_URL}/${id}/draw/`;
            let res = await axios.get(CARD_URL);

            if(!res.data.success){
                throw new Error('CARDS ARE FINISHED');
            }

            let card = res.data.cards[0];
            //console.log(card);
            this.setState(prevState => ({
                drawn: [
                    ...prevState.drawn, 
                    {
                        id: card.code,
                        image: card.image,
                        nmae: `${card.value} of ${card.suit}`
                    }
                ]
            }));
        }
        catch (err){
            alert(err);
        }
    }

    render(){
        let cards = this.state.drawn.map(card => (
            <Card key={card.id} name={card.name} image={card.image}/>
        ))
        return (
            <div className="deck">
                <h1 className="deck-title">*Card Dealer*</h1>
                <h2 className=" deck-title subtitle">*an app made with react*</h2>
                <button className="btn" onClick={this.getCard}>Get a Card!</button>
                <div className="deck-card-area">{cards}</div>
            </div>
        )
    }
}

export default Deck;