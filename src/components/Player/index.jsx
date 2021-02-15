import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Grid,
  Form,
  Button,
  Segment,
  Message,
  Icon,
} from "semantic-ui-react";
import httpRequests from "../../api/httpRequests";

const Player = () => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [id, setId] = useState("");
  const [empty, setEmpty] = useState(false);
  const [newPlayer, setNewPlayer] = useState(false);
  const [players, setPlayers] = useState([]);
  const { getPlayers, addPlayers, updatePlayers } = httpRequests;

  const handleClick = async () => {
    if (name === "") {
      setEmpty(true);
    }
    try {
      if (id) {
        var { data } = await updatePlayers(name, id);
      } else {
        var { data } = await addPlayers(name);
      }
      if (data.status === "ok") {
        setNewPlayer(!newPlayer);
        setName("");
      } else {
        console.log("error");
      }
      setId("");
      inputRef.current.focus();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = () => {
    empty && setEmpty(false);
  };

  const handleEdit = async ({ target }) => {
    setName(target.textContent);
    setId(target.id);
    inputRef.current.focus();
  };

  const handleChange = ({ target }) => {
    setName(target.value);
  };

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
      inputRef.current.focus();
    })();
  }, [newPlayer]);

  const messageError = () => {
    if (!empty) {
      return [];
    }
    return (
      <Message
        error
        header="There was some errors with your submission"
        list={["The name is require."]}
      />
    );
  };

  const tablePlayers = () => {
    return players.map((player, idx) => {
      const total = player.won + player.loss;
      const porWin =
        player.won !== 0 ? ((player.won / total) * 100).toFixed(0) + "%" : "0%";
      const porLoss =
        player.loss !== 0
          ? ((player.loss / total) * 100).toFixed(0) + "%"
          : "0%";
      return (
        <Table.Row key={idx}>
          <Table.Cell selectable>
            <div
              onClick={handleEdit}
              id={player._id}
              style={{ cursor: "pointer" }}
            >
              {player.name}
            </div>
          </Table.Cell>
          <Table.Cell>{player.won}</Table.Cell>
          <Table.Cell>{porWin}</Table.Cell>
          <Table.Cell>{player.loss}</Table.Cell>
          <Table.Cell>{porLoss}</Table.Cell>
        </Table.Row>
      );
    });
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Won</Table.HeaderCell>
                <Table.HeaderCell>percentage</Table.HeaderCell>
                <Table.HeaderCell>Loss</Table.HeaderCell>
                <Table.HeaderCell>percentage</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{tablePlayers()}</Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <Form>
            <Segment attached="top">
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="New player"
                  value={name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                />
              </Form.Field>
            </Segment>
            <Button icon primary attached="bottom" onClick={handleClick}>
              <Icon name="user" /> Add Player
            </Button>
          </Form>
          {messageError()}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Player;
