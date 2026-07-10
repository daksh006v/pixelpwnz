import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';
import PrivacyModal from './components/PrivacyModal';
import ToastProvider from './components/ToastProvider';
import useUiStore from './store/uiStore';

export default function App() {
  const { theme } = useUiStore();

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <ToastProvider />
      <PrivacyModal />
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
