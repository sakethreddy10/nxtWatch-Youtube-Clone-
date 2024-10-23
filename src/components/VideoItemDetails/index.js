import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {formatDistanceToNowStrict} from 'date-fns'
import ReactPlayer from 'react-player'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {BiListPlus} from 'react-icons/bi'
import Header from '../Header'
import SideBar from '../SideBar'
import WatchContext from '../context/WatchContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    activeTab: apiStatusConstants.initial,
    like: false,
    disLike: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      activeTab: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        description: fetchedData.video_details.description,
        id: fetchedData.video_details.id,
        thumbnailUrl: fetchedData.video_details.thumbnail_url,
        videoUrl: fetchedData.video_details.video_url,
        viewCount: fetchedData.video_details.view_count,
        title: fetchedData.video_details.title,
        publishedAt: fetchedData.video_details.published_at,
        channel: {
          name: fetchedData.video_details.channel.name,
          profileImageUrl: fetchedData.video_details.channel.profile_image_url,
          subscriberCount: fetchedData.video_details.channel.subscriber_count,
        },
      }
      this.setState({
        videoDetails: updatedData,
        activeTab: apiStatusConstants.success,
      })
    } else {
      this.setState({
        activeTab: apiStatusConstants.failure,
      })
    }
  }

  onClickLike = () => {
    const {like} = this.state
    this.setState({
      like: !like,
      disLike: false,
    })
  }

  onClickDislike = () => {
    const {disLike} = this.state
    this.setState({
      disLike: !disLike,
      like: false,
    })
  }

  onClickSave = () => {
    this.setState(prevState => ({
      save: !prevState.save,
    }))
  }

  onClickFailureRetry = () => {
    this.getVideoDetails()
  }

  renderVideoDetails = () => {
    const {videoDetails, like, disLike} = this.state
    const {
      videoUrl,
      title,
      viewCount,
      publishedAt,
      channel,
      description,
      id,
    } = videoDetails
    return (
      <WatchContext.Consumer>
        {value => {
          const {darkTheme, updateSave, savedVideosList} = value
          const dotStyle = {
            width: '20px',
            height: '20px',
            color: '#94a3b8',
            marginRight: '5px',
            marginLeft: '5px',
          }
          const likeStyle = {
            width: '20px',
            height: '20px',
          }
          const present = savedVideosList.find(each => each.id === id)
          const saveIsActive = present !== undefined
          const saveText = present !== undefined ? 'Saved' : 'Save'
          const date = formatDistanceToNowStrict(new Date(publishedAt), {
            addSuffix: true,
          })
          return (
            <>
              <div className="video-player-container">
                <ReactPlayer
                  url={videoUrl}
                  width="100%"
                  height="100%"
                  controls
                />
              </div>
              <div className="video-text-container">
                <p className={`video-details-title ${darkTheme ? 'dark' : ''}`}>
                  {title}
                </p>
                <div className="like-and-views-container">
                  <div className="views-and-time-container">
                    <p className="views-text">{viewCount} views</p>
                    <BsDot style={dotStyle} />
                    <p className="views-text">{date}</p>
                  </div>
                  <div className="like-dislike-save-container">
                    <div className="like-container">
                      <button
                        type="button"
                        className={`like-button ${like ? 'active' : ''}`}
                        onClick={this.onClickLike}
                      >
                        <AiOutlineLike style={likeStyle} />
                        Like
                      </button>
                    </div>
                    <div className="like-container">
                      <button
                        type="button"
                        className={`like-button ${disLike ? 'active' : ''}`}
                        onClick={this.onClickDislike}
                      >
                        <AiOutlineDislike style={likeStyle} />
                        Dislike
                      </button>
                    </div>
                    <div className="like-container">
                      <button
                        type="button"
                        className={`save-button ${
                          saveIsActive ? 'active' : ''
                        }`}
                        onClick={() => updateSave(videoDetails)}
                      >
                        <BiListPlus style={likeStyle} />
                        {saveText}
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="horizontal-line" />
                <div className="like-container">
                  <img
                    className="channel-image"
                    src={channel.profileImageUrl}
                    alt="channel logo"
                  />
                  <div className="channel-name-container">
                    <p className={`channel-name ${darkTheme ? 'dark' : ''}`}>
                      {channel.name}
                    </p>
                    <p className="channel-subscribers">
                      {channel.subscriberCount} subscribers
                    </p>
                  </div>
                </div>
                <p className={`video-description ${darkTheme ? 'dark' : ''}`}>
                  {description}
                </p>
              </div>
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
              className="not-found-image"
              src={
                darkTheme
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
              alt="failure view"
            />
            <h1 className={`not-found-head ${darkTheme ? 'dark' : ''}`}>
              Oops! Something Went Wrong
            </h1>
            <p className="not-found-text">
              We are having some trouble to complete your request. Please try
              again.
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
      case apiStatusConstants.success:
        return this.renderVideoDetails()
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
      <WatchContext.Consumer>
        {value => {
          const {darkTheme} = value
          return (
            <>
              <Header />
              <div className="video-details-body-container">
                <SideBar />
                <div
                  className={`video-details-container ${
                    darkTheme ? 'dark' : ''
                  }`}
                  data-testid="videoItemDetails"
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

export default VideoItemDetails
