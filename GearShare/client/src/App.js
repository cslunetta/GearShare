import logo from './logo.svg';
import './App.css';
import { Router } from 'react-router-dom';
import ApplicationViews from './components/ApplicationViews';
import { UserProfileProvider } from './providers/UserProfileProvider';

function App() {
  return (
      <Router>
          <UserProfileProvider>
              <Header />
              <ApplicationViews />
          </UserProfileProvider>
      </Router>
  );
}

export default App;
