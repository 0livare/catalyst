export default function getBaseUrl() {
  return 'http://localhost:3001/'
  // return getQueryStringParameterByName('useMockApi')
  //   ? 'http://localhost:3001/'
  //   : '/'
}

// This should really be done with a tested and maintained framework
// function getQueryStringParameterByName(name, url) {
//   if (!url) url = window.location.href

//   name = name.replace(/[\[\]]/g, "\\$&")

//   let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
//   let results = regex.exec(url)

//   if (!results)    return null
//   if (!results[2]) return ''

//   return decodeURIComponent(results[2].replace(/\+/g, " "))
// }
