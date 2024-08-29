import './App.css';
import Navbar from './components/Navbar.jsx';
//import Cards from './components/cards.jsx';
import Fetchapi from './components/Fetchapi.jsx';
import LoadMore from './components/LoadMore.jsx';


export default function App() {
  return (
    <main>
      <Navbar />
      <Fetchapi />
    </main>
  )
}
