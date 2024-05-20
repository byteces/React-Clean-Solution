// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);
import AuthGuard from "src/guards/authGuard/AuthGuard";
import GuestGuard from "src/guards/authGuard/GuestGaurd";
import PageHere from "src/views/sample-page/PageHere";
import Counter from "src/views/sample-page/Counter";
import Running from "src/views/sample-page/Running";

/* ****Pages***** */
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);
const Error = Loadable(lazy(() => import("../views/authentication/Error")));

// authentication
const Login = Loadable(
  lazy(() => import("../views/authentication/auth1/Login"))
);
const Register = Loadable(
  lazy(() => import("../views/authentication/auth1/Register"))
);
const EmailConfirmation = Loadable(
  lazy(() => import("../views/authentication/auth1/EmailConfirmation"))
);
const ForgotPassword = Loadable(
  lazy(() => import("../views/authentication/auth1/ForgotPassword"))
);
const ResetPassword = Loadable(
  lazy(() => import("../views/authentication/auth1/ResetPassword"))
);

const Router = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <FullLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="/sample-page" /> },
      { path: "/sample-page", exact: true, element: <SamplePage /> },
      { path: "/PageHere", exact: true, element: <PageHere /> },

      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <GuestGuard>
        <BlankLayout />
      </GuestGuard>
    ),
    children: [
      { path: "/auth/login", element: <Running /> },
      { path: "/auth/register", element: <Counter /> },
      { path: "/auth/forgot-password", element: <ForgotPassword /> },
      { path: "/auth/reset-password", element: <ResetPassword /> },
      { path: "/auth/email-comfirmation", element: <EmailConfirmation /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
