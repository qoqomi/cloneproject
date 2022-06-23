import Template from "../components/template";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React from "react";
import { getRoomIdAxios, ChatListAxios } from "../modules/chatInfo";
import { checkUserValidation } from "../modules/user";

function ChatList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.userInfo.userEmail);

  // const id = "62afc9b1d6296a59bd6f8989";

  const chatlist = useSelector((state) => state.chatInfo.list);
  const roomId = useSelector((state) => state.chatInfo);
  const isLogin = useSelector((state) => state.user.userInfo.is_login);

  React.useEffect(() => {
    if (isLogin === null) {
      console.log("null");
      dispatch(checkUserValidation());
      return;
    }
    if (!isLogin) {
      console.log("false");
      navigate("/");
    }
  }, [isLogin]);

  React.useEffect(() => {
    dispatch(ChatListAxios(id));
  }, [isLogin]);

  const gotoChatroom = async (other) => {
    await dispatch(getRoomIdAxios(id, other)).then((res) => {
      navigate(`/room/${res}`);
    });
  };

  // const chatlist = [
  //   {
  //     name: "아이유",
  //     image:
  //       "https://newsimg.hankookilbo.com/cms/articlerelease/2021/05/17/b41ab909-e0e2-40e8-a36a-4bae809a9024.jpg",
  //   },
  //   {
  //     name: "장원영",
  //     image:
  //       "https://www.stnsports.co.kr/news/photo/202202/145737_116218_4258.jpg",
  //   },
  //   {
  //     name: "윈터",
  //     image:
  //       "https://news.nateimg.co.kr/orgImg/hm/2021/11/04/202111042118469934178_20211104211913_01.jpg",
  //   },
  //   {
  //     name: "루다",
  //     image:
  //       "https://cdn.spotvnews.co.kr/news/photo/202108/437773_555058_3401.jpg",
  //   },
  //   {
  //     name: "김채원",
  //     image:
  //       "https://img.insight.co.kr/static/2019/09/24/700/x9v33u05o63uo9x6l48q.jpg",
  //   },
  //   {
  //     name: "설윤",
  //     image: "https://img.hankyung.com/photo/202205/BF.29962850.1.png",
  //   },
  //   {
  //     name: "김채현",
  //     image:
  //       "http://www.newsinside.kr/news/photo/202201/1125242_802798_1814.jpg",
  //   },
  // ];

  return (
    <Template>
      <ChatHeader>
        <Title>채팅목록</Title>
        <HeaderLine />
      </ChatHeader>
      <ListArea>
        {chatlist.map((v, i) => {
          return (
            <div key={"chatlist" + i}>
              <ProfileCover
                onClick={() => {
                  gotoChatroom(v.userEmail);
                }}
              >
                <ProfileImg src={"http://15.165.160.107/" + v.imageUrl} />
                <NameCover>
                  <Name>{v.userName}</Name>
                </NameCover>
              </ProfileCover>
              {chatlist.length - 1 === i ? null : <ProfileLine />}
            </div>
          );
        })}
      </ListArea>
    </Template>
  );
}

const ChatHeader = styled.section`
  width: 100%;
  height: 30px;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: large;
  margin-left: 20px;
`;

const HeaderLine = styled.hr`
  background-color: deepskyblue;
  width: calc(100% - 20px);
`;

const ListArea = styled.section`
  width: 100%;
  height: calc(100vh - 180px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 10px;
`;

const ProfileCover = styled.div`
  margin: 20px 0px 0px 30px;
  width: calc(100% - 60px);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 60px;
`;

const NameCover = styled.div`
  margin-left: 20px;
`;

const Name = styled.p`
  font-size: 20px;
`;

const ProfileLine = styled.hr`
  background-color: #ddd;
  width: calc(100% - 30px);
`;

export default ChatList;
