import { useActivityParams } from "@stackflow/react";
import { HashTagColor } from "../../utils/HashTagColor";
import React, { useEffect, useState } from "react";
import HashTag from "../../components/HashTag";
import Ajou from "../../assets/Ajou.gif";
import { IoIosCheckmark } from "react-icons/io";
import { RiAlarmWarningFill } from "react-icons/ri";
import Kakao from "../../assets/kakao.png";
import {
  GetGroupApi,
  JoinGroupApi,
  LeaveGroupApi,
} from "../../utils/api/group";
import PersonCard from "../../components/group/PersonCard";
import jwt_decode from "jwt-decode";
import { useAuth } from "../../stores/auth";
import CheckText from "../../components/group/CheckText";
import { useFlow } from "../../stackflow";
// interface ParamsValue {
//   groupID: number;
//   building: string;
//   hashtags: string[];
//   text: string;
//   wishLists: string[];
//   maxNum: number;
//   curNum: number;
//   userID: number;
//   kakaoLink: string;
// }

interface IGroupDetail {
  building: string;
  created_at: string;
  curNum: number;
  groupID: number;
  hashtags: string[];
  kakaoLink: string;
  maxNum: number;
  text: string;
  title: string;
  userID: number;
  wishLists: string[];
}
export interface IGroupJoined {
  age: number;
  gender: boolean;
  hashtags: string[];
  major: string;
  name: string;
  profile_photo: string;
  userID: number;
}

interface IGroups {
  groupDetailInfo: IGroupDetail;
  joinedUserList: IGroupJoined[];
}

const DetailGroup = () => {
  const Params: { num: string } = useActivityParams();
  const { push } = useFlow();

  const [participation, setParticipation] = useState<boolean | undefined>(
    false
  );
  const [own, setOwn] = useState<boolean | undefined>(false);

  const [group, setGroup] = useState<IGroups | null>(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    GetGroupApi(Params.num)
      .then((response) => {
        setGroup(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    duplicated(group?.joinedUserList.map((elem: IGroupJoined) => elem.userID));
  }, [group, setParticipation]);

  const onJoin = async (group_id: number) => {
    try {
      const res = await JoinGroupApi(group_id);
      setParticipation(true);
    } catch {
      alert("?????? ?????? ??????????????????.");
    }
  };

  const onLeave = async (group_id: number) => {
    try {
      const res = await LeaveGroupApi(group_id);
      if (confirm("????????? ??????????????????????")) setParticipation(false);
    } catch {
      alert("?????? ???????????? ??????????????????.");
    }
  };

  const duplicated = (ids?: number[]) => {
    const decoded = jwt_decode<Record<"sub", string>>(accessToken);
    const state = ids?.some((id) => id === Number(decoded.sub));
    setParticipation(state);

    if (ids && ids[0] === Number(decoded.sub)) setOwn(true);
    //true : ??? ??????, false : ??? ?????????
    return state;
  };

  return (
    <div className="items-center">
      <img src={Ajou} className="absolute z-5 h-[20%] opacity-50 w-full" />
      {/* ????????? ?????? Form */}
      <div className="absolute h-[70%] bg-white rounded-3xl top-[20%] w-[90%] right-1/2 left-1/2 -translate-x-1/2 shadow-[0px_2px_2px_rgba(0,0,0,0.25)] overflow-auto scrollbar-hide">
        <div className=" p-5 z-10 ">
          {/* ?????? ?????? */}
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">
              {group?.groupDetailInfo.building}
            </p>
            <RiAlarmWarningFill
              onClick={() => push("ReportActivity", { userToID: Params.num })}
              className="h-5 w-5 text-red-400"
            >
              ????????????
            </RiAlarmWarningFill>
          </div>
          <p className="text-md mt-2">{group?.groupDetailInfo.text}</p>
          {/* ????????????(?????? width ????????? ???????????? ??????) */}
          <div className="pl-3 overflow-auto scrollbar-hide -mx-5 mt-2 ">
            <div className="p-2">
              <HashTag
                text={group?.groupDetailInfo.hashtags}
                color={HashTagColor as ("red" | "blue" | "green")[]}
              />
            </div>
          </div>
          <hr className="w-full mt-5 mb-5" />
          <p className="text-lg font-medium mt-3 mb-1">
            ?????? ??????????????? ?????????.
          </p>
          <div>
            {group?.groupDetailInfo.wishLists.map((elem, index) => (
              <div key={index} className="flex items-center mb-2 ">
                <CheckText>
                  <p className={"text-md"}>{elem}</p>
                </CheckText>
              </div>
            ))}
          </div>
          <hr className="w-full mt-5 mb-5" />
          <div className="flex justify-between items-center mb-3">
            <p className="text-lg font-medium ">????????? ???????????? ??????</p>
            {group &&
              (participation ? (
                own ? (
                  <button className="w-9 h-9">
                    <img
                      src={Kakao}
                      onClick={() => {
                        window.open(group?.groupDetailInfo.kakaoLink);
                      }}
                    />
                  </button>
                ) : (
                  <button className="w-9 h-9">
                    <img
                      src={Kakao}
                      onClick={() => {
                        window.open(group?.groupDetailInfo.kakaoLink);
                      }}
                    />
                  </button>
                )
              ) : (
                <></>
              ))}
          </div>
          <div>
            {group?.joinedUserList.map((elem) => (
              <div className="mb-5">
                <PersonCard {...elem} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {group &&
        (participation ? (
          own ? (
            <button
              // onClick={() => {
              //   onLeave(group?.groupDetailInfo.groupID);
              // }}
              disabled
              className="absolute bottom-[2%] left-[5%] w-[90%] h-[40px] text-opacity-50 text-white bg-gray-500 bg-opacity-40 font-semibold text-base rounded-md shadow-button"
            >
              ??? ??? ???
            </button>
          ) : (
            <button
              onClick={() => {
                onLeave(group?.groupDetailInfo.groupID);
              }}
              className="absolute bottom-[2%] left-[5%] w-[90%] h-[40px] ring-2 ring-[#a984da] text-white bg-[#a984da] font-semibold text-base rounded-md shadow-button"
            >
              ??? ??? ???
            </button>
          )
        ) : (
          <button
            onClick={() => {
              onJoin(group?.groupDetailInfo.groupID);
            }}
            className="absolute bottom-[2%] left-[5%] w-[90%] h-[40px] ring-2 ring-[#a984da] text-[#a984da] bg-white bg-opacity-60 font-semibold text-base rounded-md shadow-button"
          >
            ?????? ??????
          </button>
        ))}
    </div>
  );
};

export default DetailGroup;

/*<button className="absolute bottom-14 -mr-3 right-0 self-center w-[62px] h-[62px] ">
        <img
          src={Kakao}
          className="flex pro:h-[70%] h-[70%]"
          onClick={() => {
            window.open(group?.groupDetailInfo.kakaoLink);
          }}
        />
      </button>
*/
