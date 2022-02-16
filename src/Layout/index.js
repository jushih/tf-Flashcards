import React from "react";
import { Fragment } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck"
import DeckList from "./DeckList"
import StudyDeck from "./StudyDeck"
import ViewDeck from "./ViewDeck"
import EditCard from "./Card/EditCard"

import {
  Link,
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";


function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          
         <Route exact path={`/`}>
           <CreateDeck />
           <DeckList />
         </Route>

         <Route path="/decks/:deckId/study">
           <StudyDeck />
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
