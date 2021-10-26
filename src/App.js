
import LandingPage from './components/LandingPage';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import AdminPanel from './components/Dashboard/AdminPanel';
import CarDetails from './components/Dashboard/CarDetails';
import AdminForm from './components/Dashboard/AdminPanel/AdminForm';
import Supplier from './components/Dashboard/Supplier';


function App() {
  return (
  
    <Router>
      <Switch>
        <Route path="/" exact render={LandingPage}>
          <LandingPage />
        </Route>
      </Switch>
      <Dashboard />
      <Route path="/AdminPanel" exact render={AdminPanel} />
      <Route path="/AdminForm" exact render={AdminForm} />
      <Route path="/CarDetails" exact render={CarDetails} />
      <Route path="/Supplier" exact render={Supplier} />
      </Router>
   
  );
}

export default App;
