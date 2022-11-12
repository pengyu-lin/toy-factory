export default {
  addToFavorite (favorite) {
    const favoriteStr = JSON.stringify(favorite)
    localStorage.setItem('favoriteList', favoriteStr)
  },
  getFavorite () {
    return JSON.parse(localStorage.getItem('favoriteList'))
  }
}
