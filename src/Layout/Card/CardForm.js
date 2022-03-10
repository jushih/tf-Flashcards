import React, { useState } from "react";
import { createCard } from "../../utils/api/index";
import { useHistory } from "react-router-dom";

function Form({ deck, deckId, formType }) {
  const history = useHistory();
  const [card, setCard] = useState([]);

  const changeFrontHandler = (event) => {
    setCard({ ...card, front: event.target.value });
  };

  const changeBackHandler = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const submitFormHandler = async (event) => {
    event.preventDefault();

    if (!card.front || !card.back) {
      window.confirm("Please fill out both front and back of card.");
    } else {
      await createCard(deckId, card);

      window.location.reload();
    }
  };

  const cancelHandler = async (event) => {
    event.preventDefault();
    history.push(`/decks/${deck.id}`);
  };

  return (
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
      <p/>
      <p/>
    </div>

  );
}

export default Form;
