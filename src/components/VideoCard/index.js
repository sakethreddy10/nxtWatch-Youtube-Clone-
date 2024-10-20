import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import WatchContext from '../context/WatchContext'
import './index.css'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    channel,
    title,
    viewCount,
    publishedAt,
    id,
  } = videoDetails

  const date = formatDistanceToNowStrict(new Date(publishedAt), {
    addSuffix: true,
  })

  return (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, changeActiveMenu} = value
        const linkStyle = {textDecoration: 'none'}

        return (
          <li className="video-card-item">
            <Link
              to={`/videos/${id}`}
              style={linkStyle}
              onClick={() => changeActiveMenu('INITIAL')}
            >
              <img
                className="thumbnail-image"
                src={thumbnailUrl}
                alt="video thumbnail"
              />
              <div className="video-description-container">
                <img
                  className="channel-profile-image"
                  src={channel.profileImageUrl}
                  alt="channel logo"
                />
                <div className="video-text-container">
                  <p className={`video-title ${darkTheme ? 'dark' : 'light'}`}>
                    {title}
                  </p>
                  <p className="channel-name">{channel.name}</p>
                  <div className="views-and-time-container">
                    <p className="views-text">{viewCount} views</p>
                    <BsDot className="dot-icon" />
                    <p className="views-text">{date}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default VideoCard
