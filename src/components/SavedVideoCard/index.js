import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import WatchContext from '../context/WatchContext'
import './index.css'

const SavedVideoCard = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    channel,
    title,
    viewCount,
    publishedAt,
    id,
  } = videoDetails
  const time = formatDistanceToNowStrict(new Date(publishedAt), {
    addSuffix: true,
  })

  return (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, changeActiveMenu} = value

        return (
          <Link
            to={`/videos/${id}`}
            className="saved-video-link"
            onClick={() => changeActiveMenu('INITIAL')}
          >
            <div className="saved-video-card-item">
              <img
                className="saved-video-image"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="saved-card-text-container-small">
                <img
                  className="saved-channel-image"
                  src={channel.profileImageUrl}
                  alt="channel logo"
                />
                <div className="saved-video-description">
                  <p className={`saved-video-title ${darkTheme ? 'dark' : ''}`}>
                    {title}
                  </p>
                  <div className="saved-views-time-container">
                    <p className="saved-text">{channel.name}</p>
                    <BsDot className="dot-icon" />
                    <p className="saved-text">{viewCount}</p>
                    <BsDot className="dot-icon" />
                    <p className="saved-text">{time}</p>
                  </div>
                </div>
              </div>
              <div className="saved-card-text-container-large">
                <p className={`saved-video-title ${darkTheme ? 'dark' : ''}`}>
                  {title}
                </p>
                <p className="saved-text">{channel.name}</p>
                <div className="saved-views-time-container">
                  <p className="saved-text">{viewCount}</p>
                  <BsDot className="dot-icon" />
                  <p className="saved-text">{time}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default SavedVideoCard
