import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/chat/ChatPage';
import { HomePage } from './pages/home/HomePage';
import { useCallback, useEffect } from 'react';
import { ChatState } from './context/chatContext';
import jwtDecode from 'jwt-decode';

function App() {
  const { user, setUser } = ChatState();

  const deleteTokenAndKickUserOut = useCallback(() => {
    localStorage.removeItem('userInfo');
    window.location.reload(false);
  }, []);

  useEffect(() => {
    if (user?.token) {
      const decoded = jwtDecode(user.token);
      const expiryDate = new Date(decoded.exp * 1000);
      new Date() > expiryDate && deleteTokenAndKickUserOut();
    }
  }, [deleteTokenAndKickUserOut, user]);

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chats' element={<ChatPage />} />
    </Routes>
  );
}

export default App;
