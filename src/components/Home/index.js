import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {GrFormClose} from 'react-icons/gr'
import {BsSearch} from 'react-icons/bs'
import WatchContext from '../context/WatchContext'
import VideoCard from '../VideoCard'
import SideBar from '../SideBar'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    displayBanner: true,
    activeTab: apiStatusConstants.initial,
    searchInput: '',
    videosList: [],
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({
      activeTab: apiStatusConstants.inProgress,
    })
    const {searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.videos.map(video => ({
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
      }))
      this.setState({
        videosList: updatedData,
        activeTab: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeTab: apiStatusConstants.failure,
      })
    }
  }

  onClickClose = () => {
    this.setState({
      displayBanner: false,
    })
  }

  onClickSearchIcon = () => {
    this.getVideos()
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickFailureRetry = () => {
    this.getVideos()
  }

  renderBanner = () => (
    <div className="banner-container">
      <div className="banner-image-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="banner-image"
        />
        <button
          type="button"
          onClick={this.onClickClose}
          data-testid="close"
          className="banner-close-button"
        >
          <GrFormClose style={{width: '25px', height: '25px'}} />
        </button>
      </div>
      <div className="banner-text-container">
        <p className="banner-text">
          Buy Nxt Watch Premium prepaid plans with UPI
        </p>
        <button type="button" className="banner-button">
          GET IT NOW
        </button>
      </div>
    </div>
  )

  renderNoSearchResults = () => (
    <WatchContext.Consumer>
      {value => {
        const {darkTheme} = value
        return (
          <div className="no-search-results-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
              className="not-found-image"
            />
            <h1 className={`not-found-head ${darkTheme ? 'dark' : ''}`}>
              No Search results found
            </h1>
            <p className="not-found-text">
              Try different key words or remove search filter
            </p>
            <button
              type="button"
              className="not-found-button"
              onClick={this.onClickSearchIcon}
            >
              Retry
            </button>
          </div>
        )
      }}
    </WatchContext.Consumer>
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

  renderVideos = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length === 0 ? (
          this.renderNoSearchResults()
        ) : (
          <ul className="videos-container">
            {videosList.map(video => (
              <VideoCard videoDetails={video} key={video.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderSearchBox = () => {
    const {searchInput} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <div
              className={`search-input-container ${darkTheme ? 'dark' : ''}`}
            >
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="search-box"
              />
              <button
                type="button"
                onClick={this.onClickSearchIcon}
                className="search-button"
              >
                <BsSearch style={{width: '20px', height: '20px'}} />
              </button>
            </div>
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

  renderBodySection = () => {
    const {displayBanner} = this.state
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <div
              className={`body-container ${darkTheme ? 'dark' : ''}`}
              data-testid="home"
            >
              {displayBanner && this.renderBanner()}
              {this.renderSearchBox()}
              {this.renderActiveTab()}
            </div>
          )
        }}
      </WatchContext.Consumer>
    )
  }

  renderActiveTab = () => {
    const {activeTab} = this.state
    switch (activeTab) {
      case apiStatusConstants.success:
        return this.renderVideos()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <SideBar />
          {this.renderBodySection()}
        </div>
      </>
    )
  }
}

export default Home
