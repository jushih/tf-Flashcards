import React, { useEffect, useState } from "react";
import Navbar from "../Display/Navbar";
import { readDeck } from "../../utils/api/index";
import { useParams, Link, useHistory } from "react-router-dom";

function StudyDeck() {
  // read deck from API and set as param
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);
  const deckId = useParams().deckId;
  const history = useHistory();
  const [cardIndex, setCardIndex] = useState(0);
  const [cardAnswer, setCardAnswer] = useState(false);

  //console.log("deckid",deckId, "cardId",cardId)

  useEffect(() => {
    async function loadDecks() {
      try {
        const response = readDeck(deckId);
        const decksFromAPI = await response;
        setDeck(decksFromAPI);
        setCards(decksFromAPI.cards);
      } catch (error) {
        console.log("Load deck error: ", error);
      }
    }
    loadDecks();
  }, []);

  //console.log(cards[cardIndex])

  const flipHandler = (event) => {
    if (cardAnswer === true) {
      setCardAnswer(false);
    } else {
      setCardAnswer(true);
    }
  };

  const nextCardHandler = (event) => {
    if (cardIndex + 1 == cards.length) {
      if (
        window.confirm(
          "You've reached the end of this deck. Restart cards? Or click 'cancel' to return to the home page.")
      ) {
        console.log('reset index')
        setCardIndex(0);
        setCardAnswer(false);
        console.log('card index',cardIndex)
      } else {
        history.push("/");
      }
    } else
    {
      setCardIndex(cardIndex + 1);
      setCardAnswer(false);
    }
  };

  /* if there are less than 3 cards, redirect to create a card */
  if (cards.length < 3) {
    return (
      <div>
        <Navbar deck={deck} navType="Study" />
        <h1>Study: {deck.name}</h1>
        <p />
        <h2>Not enough cards.</h2>
        <p>You need at least 3 cards to study.</p>

        <Link to={`/decks/${deck.id}/cards/new`}>
          <button type="button" class="btn btn-primary">
            Add Cards
          </button>
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar deck={deck} navType="Study" />
        <h1>Study: {deck.name}</h1>
        <p />

        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div class="col"></div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
            <p />
            <h3>
              Card {cardIndex + 1} of {cards.length}
            </h3>

            {cardAnswer ? (
              <p>{cards[cardIndex]?.back}</p>
            ) : (
              <p>{cards[cardIndex]?.front}</p>
            )}

            <p />
            <button
              type="button"
              class="btn btn-secondary mr-2"
              onClick={flipHandler}
            >
              Flip
            </button>
            <button
              type="button"
              class="btn btn-primary mr-2"
              onClick={nextCardHandler}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudyDeck;
