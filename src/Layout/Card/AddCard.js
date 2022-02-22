import React, { useEffect, useState } from "react";
import { readDeck, createCard } from "../../utils/api/index";
import Navbar from "../Display/Navbar";
import { useParams, useHistory } from "react-router-dom";

function AddCard() {
  const history = useHistory();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState([]);
  const deckId = useParams().deckId;
  //console.log("loading deck,", deckId);

  useEffect(() => {
    async function readSelectedDeck() {
      try {
        const deckResponse = readDeck(deckId);
        const decksFromAPI = await deckResponse;

        setDeck(decksFromAPI);
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readSelectedDeck();
  }, []);

  const changeBackHandler = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const changeFrontHandler = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();
    console.log("creating card...");
    await createCard(deckId, card);
    window.location.reload();
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    history.push(`/decks/${deck.id}`);
  };

  return (
    <div>
      <Navbar deck={deck} navType="Add Card" />
      <h1>Add Card</h1>
      <p />

      <form onSubmit={submitFormHandler}>
        <div class="form-group">
          <label>
            <h4>Front</h4>
          </label>
          <textarea
            class="form-control"
            name="front"
            id="front"
            placeholder="Front side of card."
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
            placeholder="Back side of card."
            value={card.back}
            onChange={changeBackHandler}
          ></textarea>
        </div>

        <button
          type="button"
          class="btn btn-secondary mr-2"
          onClick={cancelHandler}
        >
          Done
        </button>
        <button type="submit" class="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
