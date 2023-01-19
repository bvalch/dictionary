const getFavs = () => JSON.parse(window.localStorage.getItem("favs"))
const setFavs = (data) => window.localStorage.setItem("favs", JSON.stringify(data))

export { getFavs, setFavs };