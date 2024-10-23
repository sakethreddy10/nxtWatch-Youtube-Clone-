import WatchContext from '../context/WatchContext'

import Header from '../Header'
import SideBar from '../SideBar'

const NotFound = () => {
  const renderNotFound = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <div darkTheme={darkTheme} className="main-container">
            <img
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
              }
              alt="not found"
              className="img"
            />
            <h1 darkTheme={darkTheme} className="heading">
              Page Not Found
            </h1>
            <p darkTheme={darkTheme} className="para">
              we are sorry, the page you requested could not be found.
            </p>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )
  return (
    <>
      <Header />
      <div className="container">
        <SideBar />
        {renderNotFound()}
      </div>
    </>
  )
}

export default NotFound
