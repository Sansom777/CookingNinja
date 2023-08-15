import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
// styles
import './Navbar.css'
import Searchbar from './Searchbar'



export default function Navbar() {

  const { color, changeColor } = useContext(ThemeContext)

  return (
    <div className="navbar" style={{backgroundColor: color}}>
      <nav onClick={() => changeColor('pink')}>
        <Link to="/" className="brand">
          <h1>Cooking Ninja</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  )
}
