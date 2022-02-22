import React, { useEffect, useState } from "react";
import { readCard, readDeck, updateCard } from "../../utils/api/index";
import Navbar from "../Display/Navbar";
import { useParams, useHistory } from "react-router-dom";

function EditCard() {
  const history = useHistory();
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
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readDecksAndCards();
  }, []);

  //console.log("card", card.front);

  const changeBackHandler = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const changeFrontHandler = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    console.log("submitting form...");
    await updateCard(card);
    history.push(`/decks/${deck.id}`);
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div>
      <Navbar deck={deck} navType="Edit Card" />
      <h1>Edit Card</h1>

      <form onSubmit={submitFormHandler}>
        <div class="form-group">
          <label>
            <h4>Front</h4>
          </label>
          <textarea
            class="form-control"
            name="front"
            id="front"
            value={card.front}
            onChange={changeFrontHandler}
          ></textarea>
        </div>

        <div class="form-group">
          <label>
            <h4>Back</h4>
          </label>
          <textarea
            class="form-control"
            name="back"
            id="back"
            value={card.back}
            onChange={changeBackHandler}
          ></textarea>
        </div>

        <button
          type="button"
          class="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditCard;
