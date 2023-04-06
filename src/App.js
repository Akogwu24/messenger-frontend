import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ChatPage } from './pages/chat/ChatPage';
import { HomePage } from './pages/home/HomePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/chats' element={<ChatPage />} />
    </Routes>
  );
}

export default App;
