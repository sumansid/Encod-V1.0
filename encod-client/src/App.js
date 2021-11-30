import './App.css';
import {BrowserRouter, HashRouter ,useHistory, Route, Redirect, withRouter, Switch} from "react-router-dom";
import Button from './components/Button';
import Header from './components/Header';
import TeamEditor from './components/TeamEditor';

function App() {

  function createRoomButtonHandler(event){
    window.location.href=`#/group/${Date.now()}`
  }
  return (

    <HashRouter>
      <div>
        <Route exact path="/" component={() => {
          return (<div className="App">
      <Header/>
      <Button name="Create Room" clickHandler={createRoomButtonHandler}/>
      </div>)
        }}/>
        <Route path="/group/:id" component={TeamEditor}/>
        </div>
    </HashRouter>


  );
}

export default App;
