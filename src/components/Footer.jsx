import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h3>K-Works</h3>
          <p>
            All content on this website is provided for general information.
            All rights reserved.
          </p>
        </div>

        <div className="footer-col">
          <h3>Explore</h3>
          
        </div>

        <div className="footer-col">
          <h3>Studio</h3>

        </div>

        <div className="footer-col">
          <h3>Contact</h3>
          <p>© {new Date().getFullYear()} K-Works</p>
          <p>Everything on this site belongs to K-Works unless noted.</p>
          {/* Simple text stand-ins for social icons; replace later */}
          <div className="footer-social" aria-label="Social links">
            <span>FB</span>
            <span>IG</span>
            <span>X</span>
            <span>YT</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer