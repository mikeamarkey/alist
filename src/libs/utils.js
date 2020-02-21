export default {
  getInitialId: () => {
    const pattern = /^\/([\w-]+)/
    const path = window.location.pathname.match(pattern)
    let listId = 'test'
    if (path && path[1] && path[1].length > 0) {
      listId = path[1]
    }

    return listId
  }
}
