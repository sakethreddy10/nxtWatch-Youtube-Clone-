import {AiTwotoneFire} from 'react-icons/ai'
import Header from '../Header'
import SideBar from '../SideBar'
import SavedVideoCard from '../SavedVideoCard'
import WatchContext from '../context/WatchContext'
import './index.css'

const SavedVideos = () => {
  const renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <div className="no-search-results-container">
            <img
              className="not-found-image"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
              alt="no saved videos"
            />
            <h1 className={`not-found-head ${darkTheme ? 'dark' : ''}`}>
              No saved videos found
            </h1>
            <p className="not-found-text">
              You can save your videos while watching them
            </p>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  const renderSavedVideosList = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, savedVideosList} = value
        const style = {
          width: '20px',
          height: '20px',
          color: '#ff0b37',
        }
        return (
          <>
            <div
              className={`saved-heading-container ${darkTheme ? 'dark' : ''}`}
              data-testid="banner"
            >
              <div className={`saved-icon ${darkTheme ? 'dark' : ''}`}>
                <AiTwotoneFire style={style} />
              </div>
              <h1 className={`saved-heading ${darkTheme ? 'dark' : ''}`}>
                Saved Videos
              </h1>
            </div>
            <div className="saved-videos-list-container">
              {savedVideosList.map(video => (
                <SavedVideoCard key={video.id} videoDetails={video} />
              ))}
            </div>
          </>
        )
      }}
    </WatchContext.Consumer>
  )

  return (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, savedVideosList} = value
        const listLength = savedVideosList.length === 0
        return (
          <>
            <Header />
            <div className="saved-videos-body-container">
              <SideBar />
              <div
                className={`saved-videos-container ${darkTheme ? 'dark' : ''}`}
                data-testid="savedVideos"
              >
                {listLength ? renderFailureView() : renderSavedVideosList()}
              </div>
            </div>
          </>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default SavedVideos
