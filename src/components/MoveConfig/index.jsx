import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Grid,
  Label,
  Button,
  Segment,
  Header,
  Icon,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import httpRequests from "../../api/httpRequests";

const Player = () => {
  const inicialMove = {
    id: "",
    name: "",
  };
  const [movesOptions, setMovesOptions] = useState([]);
  const [valueMove1, setValueMove1] = useState(inicialMove);
  const [valueMove2, setValueMove2] = useState(inicialMove);
  const [moves, setMoves] = useState([]);
  const [movesConfig, setMovesConfig] = useState([]);
  const [newMoveConfig, setNewMoveConfig] = useState(false);
  const { getMoveConfig, getMoves, addMoveConfig } = httpRequests;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getMoveConfig();
        if (data.status === "ok") {
          setMovesConfig(data.movesConfig);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [newMoveConfig]);

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
    })();
  }, [newMoveConfig]);

  const allowsMoves = moves.filter((move) => {
    const value = movesConfig.some((item) => {
      return move.name === item.move;
    });
    return !value;
  });

  const options = allowsMoves.map((move) => {
    return {
      key: move._id,
      text: move.name,
      value: move._id,
    };
  });

  const allowsSkills = moves.filter((move) => {
    const value = movesConfig.some((item) => {
      return move.name === item.skills;
    });
    return !value;
  });

  const optionsSkills = allowsSkills.map((move) => {
    return {
      key: move._id,
      text: move.name,
      value: move._id,
    };
  });
  const handleChangeMove1 = (e, { value }) => {
    setValueMove1({ id: value, name: e.target.textContent });
    const options = optionsSkills.filter((move) => {
      return move.key !== value;
    });
    setMovesOptions(
      options.map((move) => {
        return {
          key: move.key,
          text: move.text,
          value: move.value,
        };
      })
    );
  };

  const handleChangeMove2 = (e, { value }) => {
    setValueMove2({ id: value, name: e.target.textContent });
  };

  const newConfig = async () => {
    if (valueMove1.id && valueMove2.id) {
      try {
        const { data } = await addMoveConfig(valueMove1, valueMove2);
        if (data.status === "ok") {
          setNewMoveConfig(!newMoveConfig);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error);
      }
      setValueMove1(inicialMove);
      setValueMove2(inicialMove);
    }
  };

  const tableMoves = () => {
    return movesConfig.map((move, index) => {
      return (
        <Table.Row key={index}>
          <Table.Cell>
            <Header as="h4" image>
              <Icon name={"check"} size="mini" />
              <Header.Content>
                <Header.Subheader>{move.move}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell>
            <Header as="h4" image>
              <Icon name={"x"} size="mini" />
              <Header.Content>
                <Header.Subheader>{move.skills}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
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
                <Table.HeaderCell>Move</Table.HeaderCell>
                <Table.HeaderCell>Kills</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{tableMoves()}</Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment attached="top">
            <Label pointing="below">Please select move</Label>
            <Dropdown
              fluid
              selection
              options={options}
              onChange={handleChangeMove1}
              value={valueMove1.id}
            />
            <Divider />
            <Label pointing="below">Please select skills</Label>
            <Dropdown
              fluid
              selection
              options={movesOptions}
              onChange={handleChangeMove2}
              value={valueMove2.id}
            />
          </Segment>
          <Button icon primary attached="bottom" onClick={newConfig}>
            <Icon name="chess board" /> New Config
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Player;
