import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'
import WatchContext from '../context/WatchContext'
import GameCard from '../GameCard'
import Header from '../Header'
import SideBar from '../SideBar'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {
    gamesList: [],
    activeTab: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGames()
  }

  getGames = async () => {
    this.setState({
      activeTab: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/gaming`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      console.log(response) // Log response
      if (response.ok) {
        const fetchedData = await response.json()
        console.log(fetchedData) // Log fetched data
        const updatedData = fetchedData.videos.map(video => ({
          id: video.id,
          thumbnailUrl: video.thumbnail_url,
          title: video.title,
          viewCount: video.view_count,
        }))
        this.setState({
          gamesList: updatedData,
          activeTab: apiStatusConstants.success,
        })
      } else {
        this.setState({
          activeTab: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching games:', error)
      this.setState({activeTab: apiStatusConstants.failure})
    }
  }

  onClickFailureRetry = () => {
    this.getGames()
  }

  renderGames = () => {
    const {gamesList} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          const style = {
            width: '20px',
            height: '20px',
            color: '#ff0b37',
          }
          return (
            <>
              <div
                className={`games-heading-container ${darkTheme ? 'dark' : ''}`}
                data-testid="banner"
              >
                <div className={`games-icon ${darkTheme ? 'dark' : ''}`}>
                  <SiYoutubegaming style={style} />
                </div>
                <h1 className={`games-heading ${darkTheme ? 'dark' : ''}`}>
                  Gaming
                </h1>
              </div>
              <ul className="games-list-container">
                {gamesList.map(game => (
                  <GameCard key={game.id} gameDetails={game} />
                ))}
              </ul>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <div className="no-search-results-container">
            <img
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
              className="not-found-image"
            />
            <h1 className={`not-found-head ${darkTheme ? 'dark' : ''}`}>
              Oops! Something Went Wrong
            </h1>
            <p className="not-found-text">
              We are having some trouble to complete your request. Please try
              again
            </p>
            <button
              type="button"
              className="not-found-button"
              onClick={this.onClickFailureRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
  )

  renderActiveTab = () => {
    const {activeTab} = this.state

    switch (activeTab) {
      case apiStatusConstants.initial:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderGames()
      default:
        return null
    }
  }

  render() {
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <>
              <Header />
              <div className="gaming-body-container">
                <SideBar />
                <div
                  className={`games-container ${darkTheme ? 'dark' : ''}`}
                  data-testid="gaming"
                >
                  {this.renderActiveTab()}
                </div>
              </div>
            </>
          )
        }}
      </WatchContext.Consumer>
    )
  }
}

export default Gaming
