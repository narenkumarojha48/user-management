import './App.css';

import { Route,Routes } from 'react-router-dom';
import Header from './components/Header';
import UserDetail from './components/UserDetail';
import UpdateUser from './components/UpdateUser';
import CreateUser from './components/CreateUser';
import UsersList from './components/UsersList';
import NotFound from './components/NotFound';
function App() {
  return (
    <div className="App">
        <Header/>
          <Routes>
            <Route path='/' element={<UsersList/>} />
            <Route path='/users'>
              <Route path='createUser' element={<CreateUser/>} />
              <Route path='editUser/:userid' element={<UpdateUser/>} />
              <Route path='userDetail/:userid' element={<UserDetail/>} />
              {/* <Route path='deleteUser/:userid' element={<CreateUser/>} /> */}
            </Route>
            <Route path='*' element={<NotFound/>} />
          </Routes>
    </div>
  );
}

export default App;
