$(function(){
  function buildHTML(message){
    var img = message.image.url ? message.image.url:``;
    var html = `<div class="right-box1">
                  <div class="right-info1">
                    ${message.user_name}
                    ${message.created_at}
                  </div>
                  <div class="right-message1">
                    <p class="right-message1__content">
                      ${message.content}
                    </p>
                    <img class="right-message1" src="${img}">
                    </img>
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.contents-right-body').append(html)
      $('#new_message')[0].reset();
      $('.contents-right-form__box__submit').prop('disabled',false);
      $('.contents-right-body').animate({ scrollTop: $('.contents-right-body')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('error');
    })
  });
});