import React, { useEffect, useState } from "react";
import {
  Table,
  Grid,
  Header,
  Button,
  Segment,
  Icon,
  Label,
  Divider,
  Dropdown,
} from "semantic-ui-react";
import httpRequests from "../../api/httpRequests";

const Play = () => {
  const inicialPlayer = {
    id: "",
    name: "",
  };
  const inicialTurn = {
    player: 0,
    name: "Player",
  };

  const [players, setPlayers] = useState([]);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [valuePlayer1, setValuePlayer1] = useState(inicialPlayer);
  const [valuePlayer2, setValuePlayer2] = useState(inicialPlayer);
  const [turn, setTurn] = useState(inicialTurn);
  const [enabledGame, setEnabledGame] = useState(false);
  const [enablePlay, setEnablePlay] = useState(true);
  const [ronda, setRonda] = useState(0);
  const [moves, setMoves] = useState([]);
  const [configMoves, setConfigMoves] = useState([]);
  const [movePlayer, setMovePlayer] = useState("");
  const [valueMove, setValueMove] = useState("");
  const [idGame, setIdGame] = useState("");
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState("");
  const {
    getPlayers,
    newGame,
    getMovesConfg,
    getMoveConfig,
    updateGame,
  } = httpRequests;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getPlayers();
        if (data.status === "ok") {
          setPlayers(data.players);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMoveConfig();
        if (data.status === "ok") {
          setConfigMoves(data.movesConfig);
          setMoves(data.movesConfig);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const options = players.map((player) => {
    return {
      key: player._id,
      text: player.name,
      value: player._id,
    };
  });

  const optionsMoves = moves.map((move) => {
    return {
      key: move._id,
      text: move.move,
      value: move.move_id,
    };
  });

  const handleChangePlayer1 = (e, { value }) => {
    setValuePlayer1({ id: value, name: e.target.textContent });
    const playersOptions = players.filter((player) => {
      return player._id !== value;
    });
    setPlayerOptions(
      playersOptions.map((player) => {
        return {
          key: player._id,
          text: player.name,
          value: player._id,
        };
      })
    );
  };

  const handleChangePlayer2 = (e, { value }) => {
    setValuePlayer2({ id: value, name: e.target.textContent });
  };

  const handleChangePlay = (e, { value }) => {
    setValueMove({ id: value, name: e.target.textContent });
  };

  const startGame = async () => {
    const game = {
      player1: {
        id: valuePlayer1.id,
        name: valuePlayer1.name,
      },
      player2: {
        id: valuePlayer2.id,
        name: valuePlayer2.name,
      },
    };

    try {
      const { data } = await newGame(game);
      if (data.status === "ok") {
        setIdGame(data.game._id);
        setEnabledGame(true);
        setRonda(1);
        setTurn({
          player: 1,
          name: `Play: ${valuePlayer1.name}`,
        });
        setEnablePlay(false);
        setScores([]);
        setWinner("");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPlay = async () => {
    if (valueMove.id) {
      if (turn.player === 1) {
        setTurn({
          player: 2,
          name: `Play: ${valuePlayer2.name.toUpperCase()}`,
        });
        setMovePlayer(valueMove.id);
      }
      if (turn.player === 2) {
        setTurn({
          player: 1,
          name: `Play: ${valuePlayer1.name.toUpperCase()}`,
        });

        const player1 = configMoves.some((config) => {
          return (
            config.move_id === movePlayer && config.skills_id === valueMove.id
          );
        });
        const player2 = configMoves.some((config) => {
          return (
            config.move_id === valueMove.id && config.skills_id === movePlayer
          );
        });
        setRonda(ronda + 1);
        const players = {
          player1: {
            won: player1,
          },
          player2: {
            won: player2,
          },
        };
        try {
          const { data } = await updateGame(players, idGame);
          if (data.status === "ok") {
            setScores(data.game.score);
            if (data.game.status_game === "GAME_OVER") {
              setWinner(data.game.winner);
              setEnablePlay(true);
              setTurn(inicialTurn);
              setEnabledGame(false);
            }
          } else {
            console.log("error");
          }
        } catch (error) {
          console.log(error);
        }
      }
      setValueMove({ id: "", name: "" });
    }
  };

  const renderScore = scores.map((score, index) => {
    return (
      <Table.Row key={index}>
        <Table.Cell>{score.ronda}</Table.Cell>
        <Table.Cell>
          <Header as="h4" image>
            <Icon name={score.name === "Draw" ? "x" : "check"} size="mini" />
            <Header.Content>
              <Header.Subheader>{score.name}</Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
      </Table.Row>
    );
  });

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <Segment attached="top">
            <Label pointing="below">Please select first player</Label>
            <Dropdown
              fluid
              selection
              options={options}
              onChange={handleChangePlayer1}
              value={valuePlayer1.id}
              disabled={enabledGame}
            />
            <Divider />
            <Label pointing="below">Please select second player</Label>
            <Dropdown
              fluid
              selection
              options={playerOptions}
              onChange={handleChangePlayer2}
              value={valuePlayer2.id}
              disabled={enabledGame}
            />
          </Segment>
          <Button
            icon
            primary
            attached="bottom"
            onClick={startGame}
            disabled={enabledGame}
          >
            <Icon name="chess board" /> New Game
          </Button>
          <Divider />
          <Segment attached="top">
            <Label as="a" color={"blue"}>
              Ronda
              <Label.Detail>{ronda}</Label.Detail>
            </Label>
            <Divider />
            <Label as="a" color="blue" ribbon size={"big"}>
              {turn.name}
            </Label>
            <Dropdown
              placeholder="Select Move"
              fluid
              selection
              options={optionsMoves}
              disabled={enablePlay}
              onChange={handleChangePlay}
              value={valueMove.id}
            />
            <Button
              icon
              primary
              attached="bottom"
              disabled={enablePlay}
              onClick={onPlay}
            >
              <Icon name="chess pawn" /> OK
            </Button>
            <Divider />
          </Segment>
        </Grid.Column>
        <Grid.Column width={8}>
          <Grid.Column width={8}>
            {scores.length > 0 && (
              <Segment attached="top">
                <h1>Score</h1>
                <hr />
                <Table basic="very" celled collapsing>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Ronda</Table.HeaderCell>
                      <Table.HeaderCell>Winner</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>{renderScore}</Table.Body>
                </Table>
                {winner && (
                  <div>
                    <Header as="h4" icon textAlign="center">
                      <Icon name="winner" />
                      <Header.Content>{winner}</Header.Content>
                    </Header>
                  </div>
                )}
              </Segment>
            )}
          </Grid.Column>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Play;
