
import HomePage from './Pages/HomePage';
import './App.css';
import { Route, Switch} from 'react-router-dom/cjs/react-router-dom.min';
import { ChatPage } from './Pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className='App'>
     
     <Route path ='/' component = {HomePage} exact/>

      <Route path='/profile' 
        render={() => 
          (
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
          )}
      />

      
      

      

    </div>
  );
}

export default App;
