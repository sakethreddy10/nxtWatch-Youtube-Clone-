import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'
import {GrFormClose} from 'react-icons/gr'
import 'reactjs-popup/dist/index.css'
import {FaMoon} from 'react-icons/fa'
import {FiSun, FiLogOut} from 'react-icons/fi'
import {GiHamburgerMenu} from 'react-icons/gi'
import WatchContext from '../context/WatchContext'

import './index.css'

const activeMenuConstants = {
  initial: 'INITIAL',
  home: 'HOME',
  trending: 'TRENDING',
  gaming: 'GAMING',
  savedVideos: 'SAVED_VIDEOS',
}

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, toggleTheme, activeMenu, changeActiveMenu} = value
        const style = {
          width: '20px',
          height: '20px',
          color: darkTheme ? '#ffffff' : '#000000',
        }
        const mobilePopup = {
          width: '20px',
          height: '20px',
          color: '#7e858e',
        }
        const themeIcon = {
          width: '30px',
          height: '30px',
          color: darkTheme ? '#ffffff' : '#000000',
        }
        const iconColor = darkTheme ? '#424242' : '#7e858e'
        const iconActive = '#ff0b37'
        const onToggleTheme = () => {
          toggleTheme()
        }
        return (
          <nav
            className={`navbar ${darkTheme ? 'navbar-dark' : 'navbar-light'}`}
          >
            <Link to="/" className="link-style">
              <img
                className="nav-logo"
                src={
                  darkTheme
                    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                }
                alt="website logo"
              />
            </Link>
            <ul className="nav-icons-mobile">
              <li className="nav-icon-item">
                <button
                  type="button"
                  className="theme-button"
                  onClick={onToggleTheme}
                  data-testid="theme"
                >
                  {darkTheme ? (
                    <FiSun style={style} />
                  ) : (
                    <FaMoon style={style} />
                  )}
                </button>
              </li>

              <Popup
                modal
                trigger={
                  <li className="nav-icon-item">
                    <GiHamburgerMenu style={style} />
                  </li>
                }
                className="popup-content"
              >
                {close => (
                  <div
                    className={`popup-mobile-container ${
                      darkTheme ? 'dark' : ''
                    }`}
                  >
                    <button
                      type="button"
                      className="popup-mobile-close-button"
                      onClick={() => close()}
                    >
                      <GrFormClose style={mobilePopup} />
                    </button>
                    <ul className="popup-mobile-list">
                      <Link to="/" className="link-style">
                        <li
                          className={`popup-mobile-item ${
                            activeMenu === activeMenuConstants.home
                              ? 'active'
                              : ''
                          }`}
                          onClick={() =>
                            changeActiveMenu(activeMenuConstants.home)
                          }
                        >
                          <AiFillHome
                            size={25}
                            color={
                              activeMenu === activeMenuConstants.home
                                ? iconActive
                                : iconColor
                            }
                          />
                          <p>Home</p>
                        </li>
                      </Link>
                      <Link to="/trending" className="link-style">
                        <li
                          className={`popup-mobile-item ${
                            activeMenu === activeMenuConstants.trending
                              ? 'active'
                              : ''
                          }`}
                          onClick={() =>
                            changeActiveMenu(activeMenuConstants.trending)
                          }
                        >
                          <AiTwotoneFire
                            size={25}
                            color={
                              activeMenu === activeMenuConstants.trending
                                ? iconActive
                                : iconColor
                            }
                          />
                          <p>Trending</p>
                        </li>
                      </Link>
                      <Link to="/gaming" className="link-style">
                        <li
                          className={`popup-mobile-item ${
                            activeMenu === activeMenuConstants.gaming
                              ? 'active'
                              : ''
                          }`}
                          onClick={() =>
                            changeActiveMenu(activeMenuConstants.gaming)
                          }
                        >
                          <SiYoutubegaming
                            size={25}
                            color={
                              activeMenu === activeMenuConstants.gaming
                                ? iconActive
                                : iconColor
                            }
                          />
                          <p>Gaming</p>
                        </li>
                      </Link>
                      <Link to="/saved-videos" className="link-style">
                        <li
                          className={`popup-mobile-item ${
                            activeMenu === activeMenuConstants.savedVideos
                              ? 'active'
                              : ''
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
                          <p>Saved videos</p>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </Popup>

              <Popup
                modal
                trigger={
                  <li className="nav-icon-item">
                    <FiLogOut style={style} />
                  </li>
                }
                className="logout-popup"
              >
                {close => (
                  <div
                    className={`popup-logout-container ${
                      darkTheme ? 'dark' : ''
                    }`}
                  >
                    <p>Are you sure, you want to logout</p>
                    <div className="popup-buttons-container">
                      <button
                        type="button"
                        className="popup-close-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="popup-confirm-button"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </ul>
            <ul className="nav-icons-desktop">
              <li className="nav-icon-item">
                <button
                  type="button"
                  className="theme-button"
                  onClick={onToggleTheme}
                  data-testid="theme"
                >
                  {darkTheme ? (
                    <FiSun style={themeIcon} />
                  ) : (
                    <FaMoon style={themeIcon} />
                  )}
                </button>
              </li>
              <li className="nav-icon-item">
                <img
                  className="profile-image"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                />
              </li>
              <li className="nav-icon-item">
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={`logout-button ${darkTheme ? 'dark' : ''}`}
                    >
                      Logout
                    </button>
                  }
                  className="logout-popup"
                >
                  {close => (
                    <div
                      className={`popup-logout-container ${
                        darkTheme ? 'dark' : ''
                      }`}
                    >
                      <p>Are you sure, you want to logout</p>
                      <div className="popup-buttons-container">
                        <button
                          type="button"
                          className="popup-close-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="popup-confirm-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </div>
                  )}
                </Popup>
              </li>
            </ul>
          </nav>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default withRouter(Header)
