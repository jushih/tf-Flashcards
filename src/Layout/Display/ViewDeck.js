import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { readDeck } from "../../utils/api/index";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteDeck from "../Deck/DeleteDeck";
import DeleteCard from "../Card/DeleteCard";

function ViewDeck() {
  // load deckId from params and use that to load deck info and card info
  const deckId = useParams().deckId;
  const [deck, setDeck] = useState([]);
  const [cards, setCards] = useState([]);

  //console.log("deckid", useParams(), deckId);

  useEffect(() => {
    async function readDeckFromAPI() {
      try {
        const deckResponse = readDeck(deckId);
        const deckFromAPI = await deckResponse;

        setDeck(deckFromAPI);
        setCards(deckFromAPI.cards);
      } catch (error) {
        console.log("Read deck error: ", error);
      }
    }
    readDeckFromAPI();
  }, [deckId]);

  //console.log("card", cards);

  return (
    <div>
      <Navbar deck={deck} navType="View" />
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>

      <div className="d-flex justify-content-between">
        <div>
          <Link to={`/decks/${deck.id}/edit`}>
            <button type="button" className="btn btn-secondary mr-2">
            <i className="fas fa-pencil-alt"></i> Edit
            </button>
          </Link>

          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary mr-2">
            <i className="fas fa-book"></i> Study
            </button>
          </Link>

          <Link to={`/decks/${deck.id}/cards/new`}>
            <button type="button" className="btn btn-primary">
            <i className="fa fa-plus"></i> Add Cards
            </button>
          </Link>
        </div>

        <div>
          <DeleteDeck deck={deck} />
        </div>
      </div>

      <p/>
      <h1>Cards</h1>
      <p/>
      {cards.map((card, index) => {
        return (
          <div className="card" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div className="col">{card.front}</div>
                <div className="col"></div>
                <div className="col">{card.back}</div>
              </div>
              <p></p>
              <div className="d-flex justify-content-end">
                <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                  <button type="button" className="btn btn-secondary mr-2">
                  <i className="fas fa-pencil-alt"></i>  Edit
                  </button>
                </Link>
                <DeleteCard card={card} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ViewDeck;
