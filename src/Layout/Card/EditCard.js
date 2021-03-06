import React, { useEffect, useState } from "react";
import { readCard, readDeck } from "../../utils/api/index";
import Navbar from "../Display/Navbar";
import { useParams, useHistory } from "react-router-dom";
import { updateCard } from "../../utils/api/index";

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
  }, [deckId, cardId]);


  const changeFrontHandler = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const changeBackHandler = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    // add card or update card
    await updateCard(card);

    window.location.reload();
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    history.push(`/decks/${deck.id}`);
  };

  //console.log("card", card.front);

  return (
    <div>
      <Navbar deck={deck} navType="Edit Card" />
      <h1>Edit Card</h1>

      <div>
      <form onSubmit={submitFormHandler}>
        <div className="form-group">
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

        <div className="form-group">
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

    </div>
  );
}

export default EditCard;
