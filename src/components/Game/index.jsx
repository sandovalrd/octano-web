import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table, Grid } from "semantic-ui-react";
import httpRequests from "../../api/httpRequests";
const { getGames } = httpRequests;

const Game = () => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getGames();
        if (data.status === "ok") {
          const finalizedGames = data.games.filter((game) => {
            return game.status_game === "GAME_OVER";
          });
          setGames(finalizedGames);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderGames = games.map((game, index) => {
    const dateBegin = moment(game.createdAt).format("MM/DD/YYYY HH:MM:SS");
    const dateEnd = moment(game.finalizedAt).format("MM/DD/YYYY  HH:MM:SS");
    const date1 = moment(game.createdAt);
    const date2 = moment(game.finalizedAt);
    const diffDate = date2 - date1;
    const loss =
      game.players.player1.name !== game.winner
        ? game.players.player1.name
        : game.players.player2.name;

    return (
      <Table.Row key={index}>
        <Table.Cell>{game.winner}</Table.Cell>
        <Table.Cell>{loss}</Table.Cell>
        <Table.Cell>{dateBegin}</Table.Cell>
        <Table.Cell>{dateEnd}</Table.Cell>
        <Table.Cell>{(diffDate / (1000 * 60)).toFixed(0)}</Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={14}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Winner</Table.HeaderCell>
                <Table.HeaderCell>Loss</Table.HeaderCell>
                <Table.HeaderCell>Date begin</Table.HeaderCell>
                <Table.HeaderCell>Date end</Table.HeaderCell>
                <Table.HeaderCell>Duration seconds</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{renderGames}</Table.Body>
          </Table>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Game;
