import {Link} from 'react-router-dom'
import {formatDistanceToNowStrict} from 'date-fns'
import {BsDot} from 'react-icons/bs'
import WatchContext from '../context/WatchContext'
import './index.css'

const TrendingVideoCard = props => {
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
        const dotStyle = {
          width: '20px',
          height: '20px',
          color: '#94a3b8',
          marginRight: '5px',
          marginLeft: '5px',
        }
        const linkStyle = {
          textDecoration: 'none',
        }
        return (
          <Link
            to={`/videos/${id}`}
            style={linkStyle}
            onClick={() => changeActiveMenu('INITIAL')}
          >
            <li className="trending-video-card-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="trending-video-image"
              />
              <div className="trending-card-text-container-small">
                <img
                  src={channel.profileImageUrl}
                  alt="channel logo"
                  className="trending-channel-image"
                />
                <div className="trending-video-description">
                  <p
                    className={`trending-video-title ${
                      darkTheme ? 'dark-title' : 'light-title'
                    }`}
                  >
                    {title}
                  </p>
                  <div className="trending-views-time-container">
                    <p className="trending-text">{channel.name}</p>
                    <BsDot style={dotStyle} />
                    <p className="trending-text">{viewCount}</p>
                    <BsDot style={dotStyle} />
                    <p className="trending-text">{time}</p>
                  </div>
                </div>
              </div>
              <div className="trending-card-text-container-large">
                <p
                  className={`trending-video-title ${
                    darkTheme ? 'dark-title' : 'light-title'
                  }`}
                >
                  {title}
                </p>
                <p className="trending-text">{channel.name}</p>
                <div className="trending-views-time-container">
                  <p className="trending-text">{viewCount}</p>
                  <BsDot style={dotStyle} />
                  <p className="trending-text">{time}</p>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default TrendingVideoCard
