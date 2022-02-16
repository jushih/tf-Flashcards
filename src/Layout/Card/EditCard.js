import React, {useEffect, useState} from "react";
import { readCard,readDeck } from "../../utils/api/index";
import Navbar from "../Navbar"
import { useParams, Link } from "react-router-dom";

function EditCard( ) {

const [deck, setDeck] = useState([]);
const [card, setCard] = useState([]);
const deckId = useParams().deckId;
const cardId = useParams().cardId;

useEffect(() => {
    async function readDecksAndCards() {
      try {
      const deckResponse = readDeck(deckId);
      const decksFromAPI = await deckResponse;

      const cardResponse = readCard(cardId);
      const cardsFromAPI = await cardResponse;

      setDeck(decksFromAPI);
      setCard(cardsFromAPI);
    }
   catch (error) {
    console.log("Read deck error: ", error)
  }
}
  readDecksAndCards();
}, []);


console.log("card",card.front)
  

    return (

        <div>
      
        <Navbar deck={deck} navType="Edit" />
        <h1>Edit Card</h1>

        <form>
  <div class="form-group">
    <label for="cardFront"><h4>Front</h4></label>
    <textarea type="text" class="form-control" id="cardFront" placeholder={card.front}>
  {card.front}</textarea></div>
  <div class="form-group">
    <label for="cardBack"><h4>Back</h4></label>
    <textarea type="text" class="form-control" id="cardBack" placeholder="placeholder">
  </textarea></div>

  </form>
  
        
        <Link to={`/decks/${deck.id}/`}>
            <button type="button" class="btn btn-secondary mr-2">
            Cancel
            </button>
          </Link>

          <Link to={`/decks/${deck.id}/`}>
            <button type="button" class="btn btn-primary">
            Submit
            </button>
          </Link>
    
      
        
        </div>
        
    )
}

export default EditCard;