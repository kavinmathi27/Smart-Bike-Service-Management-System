import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">Smart Bike Service</div>
          <p className="footer__desc">
            Your trusted partner for premium bike parts and professional service.
            Quality parts, expert mechanics, and transparent pricing.
          </p>
        </div>
        <div>
          <h4 className="footer__title">Quick Links</h4>
          <ul className="footer__links">
            <li><Link to="/">Browse Parts</Link></li>
            <li><Link to="/estimate">Cost Estimate</Link></li>
            <li><Link to="/book-service">Book Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__title">Contact</h4>
          <ul className="footer__links">
            <li><span>+91 98765 43210</span></li>
            <li><span>support@smartbike.in</span></li>
            <li><span>Chennai, India</span></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        &copy; {new Date().getFullYear()} Smart Bike Service Management System. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
