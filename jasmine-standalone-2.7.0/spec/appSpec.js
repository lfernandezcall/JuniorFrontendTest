describe('ajax test suite', function () {
  beforeEach(function () {
    jasmine.Ajax.install()
  })

  afterEach(function () {
    jasmine.Ajax.uninstall()
  })

  it('sample test', function () {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function (args) {
      if (this.readyState == this.DONE) {
        testObj.successFunction(this.responseText)
      }
    }
    spyOn(testObj, 'successFunction').and.callThrough()
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1')
    xhr.send()
    expect(jasmine.Ajax.requests.mostRecent().url).toBe('https://jsonplaceholder.typicode.com/posts/1')
    expect(testObj.successFunction).not.toHaveBeenCalled()
    jasmine.Ajax.requests.mostRecent().respondWith({
      'status': 200,
      'contentType': 'text/plain',
      'responseText': 'awesome response'
    })
    expect(testObj.successFunction).toHaveBeenCalledWith('awesome response')
  })
})
