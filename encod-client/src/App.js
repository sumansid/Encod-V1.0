import './App.css';
import {BrowserRouter, HashRouter,useHistory, Route, Redirect, withRouter} from "react-router-dom";
import Button from './components/Button';
import Header from './components/Header';
import TeamEditor from './components/TeamEditor';

function App() {

  const history = useHistory();

  function createRoomButtonHandler(event){
    window.location.href=`/group/${Date.now()}`
  }
  return (

    <HashRouter>
      <Route path="/" exact render={() => {
        return (<div className="App">
    <Header/>
    <Button name="Create Room" clickHandler={createRoomButtonHandler}/>
    </div>)
      }}></Route>
      <Route path="/group/:id" component={TeamEditor}></Route>
    </HashRouter>


  );
}

export default App;
