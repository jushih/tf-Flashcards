import React, {useEffect, useState} from "react";
import Navbar from "./Navbar"
import { readDeck, readCard } from "../utils/api/index";
import { useParams } from "react-router-dom";

function StudyDeck( ) {

  // read the selected single deck from API and set as param
  const deckId = useParams().deckId;
  const [deck, setDeck] = useState([]);

  useEffect(() => {
      async function readDecks() {
        try {
        const response = readDeck(deckId);
        const decksFromAPI = await response;
        setDeck(decksFromAPI);
      }
     catch (error) {
      console.log("Read deck error: ", error)
    }
  }
    readDecks();
  }, []);


  // load cards
  const [card, setCards] = useState([]);
  console.log("card",card)

//  useEffect(() => {
//    async function readCards() {
//      try {
//      const response = readCard(deckId);
//      const decksFromAPI = await response;
//      setDeck(decksFromAPI);
//    }
//   catch (error) {
//    console.log("Read deck error: ", error)
//  }
//}
//  readCards();
//}, []);

    //const {deckId} = useParams();


    return (
    <div>
      
    <Navbar deck={deck} navType="Study" />
    <h1>{deck.name}</h1>


  
    
    </div>

    )
  

}

export default StudyDeck;