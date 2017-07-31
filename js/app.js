var getData = function() {
    var user = document.getElementById('search-user').value

    var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.responseType = 'json'
        xhr.onload = function() {
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
        function(err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err)
            } else {
                // console.log(data)
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
        function(err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err)
            } else {
                data = data[0]
                console.log(data)
                document.getElementById('repos-ul').innerHTML = '<ul><h5>Repositories<h5></ul>'
                document.getElementById('repos-ul').innerHTML += `<li><h5>${data.name}<h5></li>
            }
        }
    )
}