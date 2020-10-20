import React from "react";

function Hand({ style, ...props }) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: ".5rem",
        ...style,
      }}
    />
  );
}

function Card({ face = "down", name, style, ...props }) {
  let isCommunityCard = React.useContext(CommunityCardContext);

  return (
    <img
      alt={`${name} card`}
      {...props}
      style={{
        maxHeight: "15vh",
        transform: isCommunityCard ? "" : `rotate(${Math.random()}turn)`,
        ...style,
      }}
      src={`/cards/${face === "down" ? "back" : name}.png`}
    />
  );
}

function Player({ name, children, seat, style, ...props }) {
  return (
    <div
      {...props}
      style={{ gridArea: `seat${seat}`, textAlign: "center", ...style }}
    >
      <h3 style={{ color: "yellow" }}>{name}</h3>
      {children}
    </div>
  );
}

let CommunityCardContext = React.createContext(false);

function CommunityCards({ children }) {
  return (
    <CommunityCardContext.Provider value="true">
      <div
        style={{
          gridArea: "community",
          padding: "2rem",
          border: ".5rem solid yellow",
          borderRadius: ".5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "Rye",
            color: "firebrick",
            textTransform: "uppercase",
            fontSize: "3rem",
            margin: "1rem 1rem 2rem",
          }}
        >
          ⭐️ Texas Holdem ⭐️
        </h2>
        <div
          style={{ display: "flex", gap: ".5rem", justifyContent: "center" }}
        >
          {children}
        </div>
      </div>
    </CommunityCardContext.Provider>
  );
}

function HoldemTable({ style, ...props }) {
  return (
    <div
      {...props}
      style={{
        // step 1
        backgroundColor: "darkgreen",
        display: "grid",
        width: "100vw",
        height: "calc(100vh - 104px)",
        margin: "-1rem",

        // show grid tools in FF
        gridTemplateColumns: "auto auto auto auto", // repeat(4, 1fr)
        gridTemplateRows: "auto auto auto", // repeat(3, 1fr)

        // show named grid areas
        gridTemplateAreas: `
          ". seat2 seat3 ."
          "seat1 community community seat4"
          ". user user ."
        `,
      }}
    />
  );
}

function MichaelChan() {
  return (
    <HoldemTable>
      <Player name="Johnny" seat={1}>
        <Hand>
          <Card />
          <Card />
        </Hand>
      </Player>

      <Player name="Moira" seat={2}>
        <Hand>
          <Card />
          <Card />
        </Hand>
      </Player>

      <Player name="David" seat={3}>
        <Hand>
          <Card />
          <Card />
        </Hand>
      </Player>

      <Player name="Alexis" seat={4}>
        <Hand>
          <Card />
          <Card />
        </Hand>
      </Player>

      <Player name="chantastic" style={{ gridArea: "user" }}>
        <Hand>
          <Card name="AS" face="up" />
          <Card name="KS" face="up" />
        </Hand>
      </Player>

      <CommunityCards>
        <Card name="3C" face="up" />
        <Card name="JH" face="up" />
        <Card name="2D" face="up" />
        <Card />
        <Card />
      </CommunityCards>
    </HoldemTable>
  );
}

export default MichaelChan;
