import React from 'react'

const WatchContext = React.createContext({
  darkTheme: false,
  toggleTheme: () => {},
  activeMenu: 'INITIAL',
  changeActiveMenu: () => {},
  savedVideosList: [],
  save: false,
  addVideosToSavedVideos: () => {},
  deleteVideosFromSavedVideos: () => {},
  updateSave: () => {},
})

export default WatchContext
