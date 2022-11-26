import "@stackflow/basic-ui/index.css";
import { stackflow } from "@stackflow/react";
import { basicRendererPlugin } from "@stackflow/plugin-renderer-basic";
import { historySyncPlugin } from "@stackflow/plugin-history-sync";
import { createLink } from "@stackflow/link";
import MakeActivity from "./utils/MakeActivity";
import SignUpActivity from "./activities/Sign/SignUp";
import CreateBoardActivity from "./activities/Community/CreateBoard";

const MainActivity = MakeActivity("Main");
const GroupActivity = MakeActivity("Group");
const CommunityActivity = MakeActivity("Community");
const MyPageActivity = MakeActivity("MyPage");
const ProfileActivity = MakeActivity("Profile");
const DetailGroupActivity = MakeActivity("DetailGroup");
const CreateGroupActivity = MakeActivity("CreateGroup");
const BoardDetailActivity = MakeActivity("BoardDetail");
const LoginActivity = MakeActivity("Login");
const ProfileEditActivity = MakeActivity("ProfileEdit");
const PasswordActivity = MakeActivity("Password");
const LikeProfileActivity = MakeActivity("LikeProfile");
const ModifyFavorActivity = MakeActivity("ModifyFavor");
const FindPassword_EmailActivity = MakeActivity("FindPassword_Email");
const FindPassword_PasswordActivity = MakeActivity("FindPassword_Password");

export type SafeActivityType = typeof activities;
export const { Link } = createLink<SafeActivityType>();

const activities = {
  GroupActivity,
  CommunityActivity,
  MainActivity,
  MyPageActivity,
  SignUpActivity,
  ProfileActivity,
  DetailGroupActivity,
  CreateGroupActivity,
  BoardDetailActivity,
  CreateBoardActivity,
  LoginActivity,
  ProfileEditActivity,
  PasswordActivity,
  LikeProfileActivity,
  ModifyFavorActivity,
  FindPassword_EmailActivity,
  FindPassword_PasswordActivity,
};

export const { Stack, useFlow } = stackflow({
  transitionDuration: 350,
  activities,
  plugins: [
    basicRendererPlugin(),
    historySyncPlugin({
      routes: {
        LoginActivity: "/",
        MainActivity: "/home",
        GroupActivity: "/group",
        CommunityActivity: "/community",
        MyPageActivity: "/mypage",
        SignUpActivity: "/signup",
        ProfileActivity: "/profile",
        ProfileEditActivity: "/mypage/edit",
        PasswordActivity: "/mypage/password",
        LikeProfileActivity: "/mypage/like",
        ModifyFavorActivity: "/mypage/modifyfavor",
        DetailGroupActivity: "/detailgroup",
        CreateGroupActivity: "/creategroup",
        BoardDetailActivity: "/board",
        CreateBoardActivity: "/createboard",
        FindPassword_EmailActivity: "/findpwd/email",
        FindPassword_PasswordActivity: "/findpwd/pwd",
      },
      fallbackActivity: () => "LoginActivity", // 오류 발생시 Home으로 이동 (404페이지 처리 할때 사용)
    }),
  ],
});
