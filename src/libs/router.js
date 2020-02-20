export default {
  getListId: () => {
    const pattern = /^\/([\w-]+)/
    const path = window.location.pathname.match(pattern)
    let listId = 'test'
    if (path && path[1] && path[1].length > 0) {
      const realPath = `/${path[1]}`
      if (window.location.pathname !== realPath) {
        window.location.href = realPath
      } else {
        listId = path[1]
      }
    }

    return listId
  }
}
