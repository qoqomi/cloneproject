import React from "react";
import styled from "styled-components";

const peopleCard = ({ data }) => {
  console.log(data);
  return (
    <>
      <OneCard
        style={{
          backgroundImage: `url(${data.profileImage})`,
        }}
      >
        {/* backgroundImage: `url(${person[0].profileImage})`, */}
        <H3>{}</H3>
        <H4>{}</H4>
      </OneCard>
    </>
  );
};
const OneCard = styled.div`
  //자식
  position: absolute;
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0px 18px 053px 0px rgba(0, 0, 0, 0.3);
  animation: box-ani 1s linear forwards; /* 애니메이션 적용 */
`;

const H3 = styled.h3`
  position: absolute;
  font-size: 24px;
  bottom: 20px;
  left: 20px;
  font-weight: bold;
  color: white;
`;
const H4 = styled.h4`
  position: absolute;
  font-size: 20px;
  bottom: 20px;
  left: 90px;
  color: white;
`;
export default peopleCard;
