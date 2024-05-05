import logo from './logo.svg';
import './App.css';
import ListGestionnaire from './components/admin/ListGestionnaire';
import ListFormateur from './components/admin/listFormateur';
import { Routes } from 'react-router-dom/dist';

function App() {
  return <>
     <ListGestionnaire/>
     <ListFormateur/>
     
  </>
    
}

export default App;
