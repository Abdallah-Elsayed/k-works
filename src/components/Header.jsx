import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

function Header() {
  // false = menu closed on mobile; true = menu open
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  function toggleMenu() {
    setMenuOpen((open) => !open)
  }

  return (
    <header className="header">
      <div className="header-inner">
        {/* Left: logo + name */}
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <img
            className="header-logo"
            src={`${import.meta.env.BASE_URL}${"/kworks-logo.svg".replace(/^\//, '')}`}
            alt="K-Works logo"
          />
          <span className="header-name">K-Works</span>
        </Link>

        {/* Hamburger button: only used on small screens (CSS hides it on desktop) */}
        <button
          className="header-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          {/* Three bars; CSS can also animate these later if you want */}
          <span className="header-toggle-bar"></span>
          <span className="header-toggle-bar"></span>
          <span className="header-toggle-bar"></span>
        </button>

        {/* Right side: nav pill + gold button
            class "is-open" is added on mobile when the menu is open */}
        <div className={`header-right ${menuOpen ? 'is-open' : ''}`}>
          <nav className="header-nav" aria-label="Main">
            <NavLink to="/" end onClick={closeMenu}>Home</NavLink>
            <NavLink to="/works" onClick={closeMenu}>Works</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
          </nav>

          <Link
            to="/studio"
            className="btn btn-gold header-cta"
            onClick={closeMenu}
          >
            Studio
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header