import {Link} from 'react-router-dom'
import WatchContext from '../context/WatchContext'
import './index.css'

const GameCard = props => {
  const {gameDetails} = props
  const {thumbnailUrl, title, viewCount, id} = gameDetails

  return (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme, changeActiveMenu} = value
        const linkStyle = {
          textDecoration: 'none',
        }
        return (
          <li className="game-card-container">
            <Link
              to={`/videos/${id}`}
              style={linkStyle}
              onClick={() => changeActiveMenu('INITIAL')}
            >
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-image"
              />
              <p className={`game-title ${darkTheme ? 'dark' : ''}`}>{title}</p>
              <p className="game-view-count">{viewCount} Watching Worldwide</p>
            </Link>
          </li>
        )
      }}
    </WatchContext.Consumer>
  )
}

export default GameCard
