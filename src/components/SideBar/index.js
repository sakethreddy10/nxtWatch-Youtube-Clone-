import {Link} from 'react-router-dom'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import WatchContext from '../context/WatchContext'

import './index.css'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED _VIDEOS',
}

const sideBar = () => (
  <WatchContext.Consumer>
    {value => {
      const {darkTheme, activeMenu, changeActiveMenu} = value
      const iconColor = darkTheme ? '#424242' : '#7e858e'
      const iconActive = '#ff0b37'
      return (
        <div className={`sidebar-desktop ${darkTheme ? 'dark-theme' : ''}`}>
          <ul className="sidebar-list-container">
            <Link to="/" className="link-style">
              <li
                className={`sidebar-list-item ${
                  activeMenu === activeMenuConstants.home ? 'active' : ''
                }`}
                onClick={() => changeActiveMenu(activeMenuConstants.home)}
              >
                <AiFillHome
                  size={25}
                  color={
                    activeMenu === activeMenuConstants.home
                      ? iconActive
                      : iconColor
                  }
                />
                <p className="list-item-text">Home</p>
              </li>
            </Link>
            <Link to="/trending" className="link-style">
              <li
                className={`sidebar-list-item ${
                  activeMenu === activeMenuConstants.trending ? 'active' : ''
                }`}
                onClick={() => changeActiveMenu(activeMenuConstants.trending)}
              >
                <AiTwotoneFire
                  size={25}
                  color={
                    activeMenu === activeMenuConstants.trending
                      ? iconActive
                      : iconColor
                  }
                />
                <p className="list-item-text">Trending</p>
              </li>
            </Link>
            <Link to="/gaming" className="link-style">
              <li
                className={`sidebar-list-item ${
                  activeMenu === activeMenuConstants.gaming ? 'active' : ''
                }`}
                onClick={() => changeActiveMenu(activeMenuConstants.gaming)}
              >
                <SiYoutubegaming
                  size={25}
                  color={
                    activeMenu === activeMenuConstants.gaming
                      ? iconActive
                      : iconColor
                  }
                />
                <p className="list-item-text">Gaming</p>
              </li>
            </Link>
            <Link to="/saved-videos" className="link-style">
              <li
                className={`sidebar-list-item ${
                  activeMenu === activeMenuConstants.savedVideos ? 'active' : ''
                }`}
                onClick={() =>
                  changeActiveMenu(activeMenuConstants.savedVideos)
                }
              >
                <BiListPlus
                  size={25}
                  color={
                    activeMenu === activeMenuConstants.savedVideos
                      ? iconActive
                      : iconColor
                  }
                />
                <p className="list-item-text">Saved Videos</p>
              </li>
            </Link>
          </ul>

          <div className="sidebar-contact-container">
            <p className="contact-us-head">CONTACT US</p>
            <ul className="social-media-container">
              <li className="social-media-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                  className="social-media-image"
                />
              </li>
              <li className="social-media-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                  className="social-media-image"
                />
              </li>
              <li className="social-media-item">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                  className="social-media-image"
                />
              </li>
            </ul>
            <p className="contact-text">
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </WatchContext.Consumer>
)

export default sideBar
