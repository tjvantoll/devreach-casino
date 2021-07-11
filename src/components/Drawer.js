import React from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';
import { Avatar, Drawer as DrawerContainer, DrawerContent } from '@progress/kendo-react-layout';

const items = [
  { text: "TJ VanToll", icon: "k-i-home", route: "/" },
  { text: "Ryan Chenkie", icon: "k-i-globe-outline", route: "/ryan-chenkie" },
  { text: "Amal Hussein", icon: "k-i-plus-outline", route: "/amal-hussein" },
  { text: "Michael Labriola", icon: "k-i-comment", route: "/michael-labriola" },
  { text: "Cher Scarlett", icon: "k-i-cart", route: "/cher-scarlett" },
  { text: "Nader Dabit", icon: "k-i-calendar", route: "/nader-dabit" },
  { text: "Tanner Linsley", icon: "k-i-folder", route: "/tanner-linsley" },
  { text: "Michael Chan", icon: "k-i-star-outline", route: "/michael-chan" },
];

const Drawer = (props) => {
  const history = useHistory();
  const location = useLocation();

  const [expanded, setExpanded] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(() => {
    let id = 0;
    items.forEach((item, index) => {
      if (item.route === location.pathname) {
        id = index;
      }
    });
    return id;
  });

  const onSelect = (e) => {
    setSelectedId(e.itemIndex);
    setExpanded(false);
    history.push(e.itemTarget.props.route);
  }
  const closeDrawer = () => {
    setExpanded(false);
  }
  const toggleDrawer = () => {
    setExpanded(currentExpanded => {
      return !currentExpanded;
    });
  }

  const getAvatarImage = () => {
    let match;
    items.forEach(item => {
      if (item.route === location.pathname) {
        match = item;
      }
    })
  
    let imageName = match.text.replace(' ', '-').toLowerCase();
    return `/avatars/${imageName}.jpg`;
  }

  return (
    <div>
      <DrawerContainer
        expanded={expanded}
        items={items.map(
          (item) => ({ ...item, selected: items[selectedId].text === item.text }))}
        onSelect={onSelect}
        animation={{ duration: 400 }}
        position="start"
        onOverlayClick={closeDrawer}
      >
        <DrawerContent>
          <div className="header">
            <h1>
              <Button icon="menu" look="flat" onClick={toggleDrawer} />
              <span className="title">
                <span role="img" aria-label="">🎲</span>
                DevReach Casino
                <span role="img" aria-label="">🎰</span>
              </span>
              
            </h1>
          </div>
          {props.children}
        </DrawerContent>
      </DrawerContainer>
    </div>
  );
}

export default withRouter(Drawer);
