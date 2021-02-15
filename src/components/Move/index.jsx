import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Grid,
  Feed,
  Button,
  Segment,
  Icon,
  Form,
} from "semantic-ui-react";
import httpRequests from "../../api/httpRequests";

const Move = () => {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [empty, setEmpty] = useState(false);
  const [moves, setMoves] = useState([]);
  const [newMove, setNewMove] = useState(false);
  const { getMoves, addMove } = httpRequests;

  const handleKeyPress = () => {
    empty && setEmpty(false);
  };

  const handleClick = async () => {
    try {
      const { data } = await addMove(name);
      if (data.status === "ok") {
        setNewMove(!newMove);
        setName("");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ target }) => {
    setName(target.value);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMoves();
        if (data.status === "ok") {
          setMoves(data.moves);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
      inputRef.current.focus();
    })();
  }, [newMove]);

  const renderMoves = moves.map((move, index) => {
    const iconsDefault = [
      "hand paper",
      "hand rock",
      "hand scissors",
      "superpowers",
    ];

    return (
      <Feed.Event key={index}>
        <Feed.Label icon={index > 3 ? iconsDefault[3] : iconsDefault[index]} />
        <Feed.Content>
          <Feed.Summary>{move.name}</Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  });

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column width={6}>
          <Form>
            <Segment attached="top">
              <Form.Field>
                <label>Name</label>
                <input
                  placeholder="New move"
                  value={name}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  ref={inputRef}
                />
              </Form.Field>
            </Segment>
            <Button icon primary attached="bottom" onClick={handleClick}>
              <Icon name="move" /> Add Move
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={6}>
          <Card>
            <Card.Content>
              <Card.Header>Moves</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>{renderMoves}</Feed>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Move;
