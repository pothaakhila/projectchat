import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import AuthLayout from "../layouts/auth";
import DashboardLayout from "../layouts/dashboard";

// config
import LoadingScreen from "../components/LoadingScreen";
import { DEFAULT_PATH } from "../config";
import Groupgeneral from "../pages/dashboard/Groupgeneral";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {


  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "new-password", element: <NewPasswordPage /> },
        {path: "verify", element: <VerifyPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "contacts", element: <Contactgeneral /> },
        { path: "group", element: <Groupgeneral /> },
        { path: "call", element: <Callgeneral /> },
        { path: "settings", element: <Settingsgeneral /> },
        { path: "account", element: <Accountgeneral /> },
        {path:"myprofile",element:<Mygeneral/>},
               { path: "settings", element: <Settings /> },
        { path: "conversation", element: <Conversation /> },
        { path: "chats", element: <Chats /> },
        { path: "chats", element: <ProfileCard /> },
        { path: "chatpage", element: <ChatPage /> },
        { path: "chatgeneral", element: <Chatgeneral /> },
        
        { path: "myprofile", element: <MyProfile /> },
        { path: "contact", element: <Contact /> },
        { path: "profile", element: <Profile /> },
        { path: "account", element: <Account /> },
        //{ path: "chat", element: <ChatPage /> }, // New route for ChatPage
        
        {path: "call", element: <CallPage />},
        
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

   
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

const Contactgeneral = Loadable(
  lazy(() => import("../pages/dashboard/Contactgeneral"))
);
const Callgeneral = Loadable(
  lazy(() => import("../pages/dashboard/Callgeneral"))
);

const Settingsgeneral = Loadable(
  lazy(() => import("../pages/dashboard/Settingsgeneral"))
);
const Accountgeneral = Loadable(
  lazy(() => import("../pages/dashboard/Accountgeneral"))
);

const Mygeneral = Loadable(
  lazy(() => import("../pages/dashboard/Mygeneral"))
);
const ChatPage = Loadable(
  lazy(() => import("../pages/dashboard/ChatPage"))
);
const Conversation = Loadable(
  lazy(() => import("../pages/dashboard/Conversation"))
);
const MyProfile = Loadable(lazy(() => import("../pages/dashboard/MyProfile")));
const Chats = Loadable(lazy(() => import("../pages/dashboard/Chats")));
const ProfileCard = Loadable(lazy(() => import("../components/Conversation/ProfileCard")));
const Account=  Loadable(lazy(()=>import ("../pages/dashboard/Account")
));
const Group = Loadable(lazy(() => import("../pages/dashboard/Group")));
const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call")));
const Contact = Loadable(lazy(() => import("../sections/Dashboard/Contact")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);
const NewPasswordPage = Loadable(
  lazy(() => import("../pages/auth/NewPassword"))
);

// Settings
const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));
const Profile = Loadable(
  lazy(() => import("../pages/dashboard/Settings/Profile"))
);
const Chatgeneral = Loadable(
  lazy(() => import("../pages/dashboard/Chatgeneral"))
);
