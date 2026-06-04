import { useDarkMode } from './hooks/useDarkMode';
import Home from './pages/Home';
import './App.css';

export default function App() {
  const [dark, setDark] = useDarkMode();
  return <Home dark={dark} toggleDark={() => setDark(d => !d)} />;
}
