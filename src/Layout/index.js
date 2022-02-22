import React from "react";
import { Fragment } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./CreateDeckButton"
import CreateDeck from "./CreateDeck"
import DeckList from "./DeckList"
import StudyDeck from "./StudyDeck"
import ViewDeck from "./ViewDeck"
import AddCard from "./Card/AddCard"
import EditCard from "./Card/EditCard"
import EditDeck from "./EditDeck"
import {
  Route,
  Switch
} from "react-router-dom";


function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          
         <Route exact path={`/`}>
           <CreateDeckButton />
           <DeckList />
         </Route>

         <Route path="/decks/new">
           <CreateDeck />
         </Route>

         <Route path="/decks/:deckId/study">
           <StudyDeck />
         </Route>

         <Route path="/decks/:deckId/edit">
           <EditDeck />
         </Route>

         <Route path="/decks/:deckId/cards/new">
           <AddCard />
         </Route>

         <Route path="/decks/:deckId/cards/:cardId/edit">
           <EditCard />
         </Route>

         <Route path="/decks/:deckId/">
           <ViewDeck />
         </Route>

          <Route>
          <NotFound />
          </Route>
          
       </Switch>
      </div>
    </Fragment>
    
  );
}

export default Layout;
