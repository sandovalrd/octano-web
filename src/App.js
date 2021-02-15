import Nav from "../src/components/Nav";
import Game from "../src/components/Game";
import Player from "./components/Player";
import Move from "../src/components/Move";
import Play from "./components/Play";
import MoveConfig from "./components/MoveConfig";
import { Container } from "semantic-ui-react";
import { Router, Route } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <Container>
      <Router history={history}>
        <Nav />
        <Route path="/" exact component={Play} />
        <Route path="/games" exact component={Game} />
        <Route path="/players" exact component={Player} />
        <Route path="/moves" exact component={Move} />
        <Route path="/config" exact component={MoveConfig} />
      </Router>
    </Container>
  );
}

export default App;
