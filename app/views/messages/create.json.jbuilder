json.id @message.id
json.created_at @message.created_at.to_s(:datetime)
json.content  @message.content
json.image  @message.image
json.user_name  @message.user.name