$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var img = message.image.url ? message.image.url:``;
    var html = `<div class="right-box1" data-id ="${message.id}">
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
      $('.contents-right-body').animate({ scrollTop: $('.contents-right-body')[0].scrollHeight}, 'fast');
      $('.contents-right-form__box__submit').prop('disabled',false);
    })
    .fail(function() {
      alert('error');
    })
  });

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.right-box1:last').data('id');
    if(window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })

      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.contents-right-body').append(insertHTML);
          $('.contents-right-body').animate({ scrollTop: $('.contents-right-body')[0].scrollHeight}, 'fast');
        });
      })

      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});