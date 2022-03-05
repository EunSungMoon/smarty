import React from 'react';
import './Styles/main.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/layout/Header';
import Footer from './Components/layout/Footer';
import LoginJoin from './Pages/LoginJoin';
import Board from './Components/layout/Board';
import Month from "./Components/calendar/Month";

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
              {/* {localStorage.token ? */}
                <>
                  <Header />
                  <Month />
                  <Route path='/todolist/'>
                    <Board />
                  </Route>
                </>
                {/* : <p>잘못된 접근입니다. 다시 돌아가주세요</p>
              } */}
            </>
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
