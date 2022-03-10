import React from "react";
import { deleteDeck } from "../../utils/api/index";

function DeleteDeck({ deck }) {

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      deleteDeck(deck.id);
      window.location.reload();
    }
  };

  return (
    <button type="button" class="btn btn-danger" onClick={deleteHandler}>
    <i className="fas fa-trash-alt"></i>
    </button>
  );
}

export default DeleteDeck;
