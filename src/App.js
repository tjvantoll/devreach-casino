import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Home from './components/Home';
import RyanChenkie from './components/RyanChenkie';
import AmalHussein from './components/AmalHussein';
import MichaelLabriola from './components/MichaelLabriola';
import CherScarlett from './components/CherScarlett';
import NaderDabit from './components/NaderDabit';
import TannerLinsley from './components/TannerLinsley';
import MichaelChan from './components/MichaelChan';

import '@progress/kendo-theme-material/dist/all.css';
import './App.css';

function App() {
  return (
    <Router>
      <Drawer>
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/ryan-chenkie">
              <RyanChenkie />
            </Route>
            <Route path="/amal-hussein">
              <AmalHussein />
            </Route>
            <Route path="/michael-labriola">
              <MichaelLabriola />
            </Route>
            <Route path="/cher-scarlett">
              <CherScarlett />
            </Route>
            <Route path="/nader-dabit">
              <NaderDabit />
            </Route>
            <Route path="/tanner-linsley">
              <TannerLinsley />
            </Route>
            <Route path="/michael-chan">
              <MichaelChan />
            </Route>
          </Switch>
        </div>
      </Drawer>
    </Router>
  );
}

export default App;
