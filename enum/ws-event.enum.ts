export enum WSEventType {
  UPDATE_ROOM = "update_room",
  CHAT_ROOM_CREATED = "chat_room_created",
  NEW_MESSAGE = "new_message",
}

export enum WSReceiver {
  ALL = "all",
  MEMBER = "member",
  CHAT_ROOM = "chat_room",
  ADMIN = "admin",
  USER = "user",
}
