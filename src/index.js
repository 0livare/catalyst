import './index.css'
import { getUsers, deleteUser } from './api/userApi'

// Populate table of users via API call
getUsers().then(result => {
  let usersBody = ''

  result.forEach(user => {
    usersBody += `
      <tr>
        <td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
        <td>${user.id}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>
      </tr>
    `
  })

  global.document.getElementById('users').innerHTML = usersBody

  let deleteLinks = global.document.getElementsByClassName('deleteUser')

  console.log('deleteLinks', deleteLinks)

  // Must use Array.from to generate a real array from a DOM collection
  // getElementsByClassName only returns an "array like" object
  Array.from(deleteLinks, link => {
    link.onclick = function(event) {
      // Prevent the link from actually changing the url
      event.preventDefault()

      // Delete the entry from the "database"
      const element = event.target
      deleteUser(element.attributes["data-id"].value)

      // Remove the row from the page
      const row = element.parentNode.parentNode
      console.log('row', row)
      row.parentNode.removeChild(row)
    }
  })
})
