var testObj = {
  ajaxFunction: function (url) {
    $.ajax({
      url: url
    }).done(this.successFunction.bind(this))
  },
  successFunction: function (data) {
    console.log(data)
  }
}
