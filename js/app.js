var getData = function () {
  var user = document.getElementById('search-user').value


  var getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'json'
    xhr.onload = function () {
      var status = xhr.status
      if (status == 200) {
        callback(null, xhr.response)
      } else {
        callback(status)
      }
    }
    xhr.send()
  }

  getJSON('https://api.github.com/users/' + user,
        function (err, data) {
          if (err != null) {
            document.getElementById('user-error').style.display = 'inline-block'
            document.getElementById('profile-container').style.display = 'none'
            document.getElementById('repos-container').style.display = 'none'
          } else {
            document.getElementById('profile-container').style.display = 'inline-block'
            document.getElementById('repos-container').style.display = 'initial'
            document.getElementById('user-error').style.display = 'none'
            document.getElementById('user-name').innerHTML = '@' + data.login
            document.getElementById('user-full-name').innerHTML = data.name
            document.getElementById('user-bio').innerHTML = data.bio
            document.getElementById('user-image').style.display = 'inline-block'
            document.getElementById('user-image').src = data.avatar_url
          }
        }
    )

  var userRepos = {}

  getJSON('https://api.github.com/users/' + user + '/repos',
        function (err, data) {
          if (err != null) {
            console.log('Something went wrong: ' + err)
            userRepos = {}
          } else {
            userRepos = data
            document.getElementById('repos-ul').innerHTML = '<li><h5>Repositories</h5></li><ul id="repos-li-child"></ul>'
            for (i = 0; i < userRepos.length; i++) {
              document.getElementById('repos-li-child').innerHTML += `<li><h4>${userRepos[i].name}</h4><span><i class="fa fa-star" aria-hidden="true"> ${userRepos[i].stargazers_count}</i><i class="fa fa-code-fork" aria-hidden="true"> ${userRepos[i].forks_count}</i></span></li>`
            }
          }
        }
    )
  
  document.getElementById('search-form').reset()

}
