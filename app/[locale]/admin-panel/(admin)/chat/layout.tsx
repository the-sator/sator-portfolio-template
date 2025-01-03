import ChatList from "@/components/chat/chat-list";
import { ChatRoomContainer } from "@/components/chat/chat-room-container";
import FilterInput from "@/components/ui/filter/filter-input";
import { CreateChatRoomModal } from "@/components/ui/modal/chat-room-modals";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getAdminSession } from "@/data/admin";
import { getAllInvitableChatMember } from "@/data/chat-member";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};
export default async function layout({ children, params }: Props) {
  const [{ data: chatMember }, { auth }] = await Promise.all([
    getAllInvitableChatMember(),
    getAdminSession(),
  ]);
  if (!auth) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div className="grid grid-cols-1 gap-2 p-4 sm:grid-cols-3">
      {/* <div className="no-scrollbar relative h-[calc(100svh-72px)] w-full rounded-sm bg-accent">
        <div className="sticky top-0 z-10 flex w-full items-center gap-2 bg-accent p-2">
          <FilterInput
            placeholder="Search..."
            filterKey="chat_room_name"
            page={false}
          />
          <CreateChatRoomModal member={chatMember} admin={auth} />
        </div>
        <div className="p-2">
          <ChatList isAdmin={true} auth={auth} />
        </div>
      </div> */}
      <ChatRoomContainer auth={auth} isAdmin={true}>
        <FilterInput
          placeholder="Search..."
          filterKey="chat_room_name"
          page={false}
        />
        <CreateChatRoomModal member={chatMember} admin={auth} />
      </ChatRoomContainer>
      {children}
    </div>
  );
}
