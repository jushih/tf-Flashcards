import React from "react";
import { deleteDeck } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function DeleteDeck( {deck} ) {

    const history = useHistory();

    // handle deletion

    
//    const handleDelete = async (deck.id) => {
//      console.log("deckID to delete",deck.id)
//      const result = window.confirm("Are you sure you want to delete this deck?");
//      if (result) {
//        await deleteDeck(deck.id);
//        history.push("/")
//      }
//    };
  
const deleteHandler = () => {
    if (
      window.confirm("Are you sure you want to delete this deck?")
    ) {
      deleteDeck(deck.id);
      history.push(`/`)
    }
  };
  

    return (
        <button type="button" class="btn btn-danger" onClick={deleteHandler}>
        Delete
      </button>
    )
}

export default DeleteDeck;