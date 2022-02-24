import React from 'react';
import './Styles/main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import LoginJoin from './Pages/LoginJoin';
import Main from './Pages/Main';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className='container-fluid'>
          <Switch>
            <Route exact path='/'>
              <LoginJoin />
            </Route>
            <>
              <Header />
              <Route path='/smarty'>
                <Main />
              </Route>
            </>
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
