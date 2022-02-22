import React from "react";
import { deleteCard } from "../../utils/api/index";
import { useHistory } from "react-router-dom";

function DeleteCard({ card }) {
  const history = useHistory();

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      deleteCard(card.id);
      window.location.reload();
    }
  };

  return (
    <button type="button" class="btn btn-danger" onClick={deleteHandler}>
      Delete
    </button>
  );
}

export default DeleteCard;
