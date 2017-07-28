var getData = function () {
	var user = document.getElementById('search-user').value
	console.log(user)

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
	    };
	    xhr.send()
	}

	getJSON('https://api.github.com/users/' + user,
	function(err, data) {
	  if (err != null) {
	    alert('Something went wrong: ' + err)
	  } else {
	    console.log(data)
	  }
	})
}