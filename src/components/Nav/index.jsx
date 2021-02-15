import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const itemsMenu = ["Play", "Games", "Players", "Moves", "Setting"];
  const [activeItem, setActiveItem] = useState(itemsMenu[0]);
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Segment inverted>
      <Menu inverted secondary>
        <Menu.Item
          as={Link}
          to="/"
          name={itemsMenu[0]}
          active={activeItem === itemsMenu[0]}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/games"
          name={itemsMenu[1]}
          active={activeItem === itemsMenu[1]}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/players"
          name={itemsMenu[2]}
          active={activeItem === itemsMenu[2]}
          onClick={handleItemClick}
        />
        <Menu.Item
          as={Link}
          to="/moves"
          name={itemsMenu[3]}
          active={activeItem === itemsMenu[3]}
          onClick={handleItemClick}
        />

        <Menu.Menu position="right">
          <Menu.Item
            as={Link}
            to="/config"
            name={itemsMenu[4]}
            active={activeItem === itemsMenu[4]}
            onClick={handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};

export default Nav;
