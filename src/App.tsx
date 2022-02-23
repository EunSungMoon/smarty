import React from 'react';
import './Styles/main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import LoginJoin from './Pages/LoginJoin/LoginJoin';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fluid'>
          <Switch>
            <Route path='/'>
              <LoginJoin />
            </Route>
          </Switch>

          <Switch >
            <Route path='/smarty'>
              <Header />
              <Footer />
            </Route>
          </Switch>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
