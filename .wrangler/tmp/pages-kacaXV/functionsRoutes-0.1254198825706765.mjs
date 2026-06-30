import { onRequestOptions as __api_auth_login_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\login.ts"
import { onRequestPost as __api_auth_login_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\login.ts"
import { onRequestOptions as __api_auth_logout_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\logout.ts"
import { onRequestPost as __api_auth_logout_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\logout.ts"
import { onRequestGet as __api_auth_me_ts_onRequestGet } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\me.ts"
import { onRequestOptions as __api_auth_me_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\me.ts"
import { onRequestOptions as __api_auth_signup_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\signup.ts"
import { onRequestPost as __api_auth_signup_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\auth\\signup.ts"
import { onRequestOptions as __api_license_activate_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\activate.ts"
import { onRequestPost as __api_license_activate_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\activate.ts"
import { onRequestOptions as __api_license_master_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\master.ts"
import { onRequestPost as __api_license_master_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\master.ts"
import { onRequestOptions as __api_license_track_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\track.ts"
import { onRequestPost as __api_license_track_ts_onRequestPost } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\track.ts"
import { onRequestGet as __api_license_validate_ts_onRequestGet } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\validate.ts"
import { onRequestOptions as __api_license_validate_ts_onRequestOptions } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\license\\validate.ts"
import { onRequest as __api_health_ts_onRequest } from "C:\\Users\\Acer\\Downloads\\Test\\toolai\\functions\\api\\health.ts"

export const routes = [
    {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_login_ts_onRequestOptions],
    },
  {
      routePath: "/api/auth/login",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_login_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/logout",
      mountPath: "/api/auth",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_logout_ts_onRequestOptions],
    },
  {
      routePath: "/api/auth/logout",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_logout_ts_onRequestPost],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "GET",
      middlewares: [],
      modules: [__api_auth_me_ts_onRequestGet],
    },
  {
      routePath: "/api/auth/me",
      mountPath: "/api/auth",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_me_ts_onRequestOptions],
    },
  {
      routePath: "/api/auth/signup",
      mountPath: "/api/auth",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_auth_signup_ts_onRequestOptions],
    },
  {
      routePath: "/api/auth/signup",
      mountPath: "/api/auth",
      method: "POST",
      middlewares: [],
      modules: [__api_auth_signup_ts_onRequestPost],
    },
  {
      routePath: "/api/license/activate",
      mountPath: "/api/license",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_license_activate_ts_onRequestOptions],
    },
  {
      routePath: "/api/license/activate",
      mountPath: "/api/license",
      method: "POST",
      middlewares: [],
      modules: [__api_license_activate_ts_onRequestPost],
    },
  {
      routePath: "/api/license/master",
      mountPath: "/api/license",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_license_master_ts_onRequestOptions],
    },
  {
      routePath: "/api/license/master",
      mountPath: "/api/license",
      method: "POST",
      middlewares: [],
      modules: [__api_license_master_ts_onRequestPost],
    },
  {
      routePath: "/api/license/track",
      mountPath: "/api/license",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_license_track_ts_onRequestOptions],
    },
  {
      routePath: "/api/license/track",
      mountPath: "/api/license",
      method: "POST",
      middlewares: [],
      modules: [__api_license_track_ts_onRequestPost],
    },
  {
      routePath: "/api/license/validate",
      mountPath: "/api/license",
      method: "GET",
      middlewares: [],
      modules: [__api_license_validate_ts_onRequestGet],
    },
  {
      routePath: "/api/license/validate",
      mountPath: "/api/license",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_license_validate_ts_onRequestOptions],
    },
  {
      routePath: "/api/health",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_health_ts_onRequest],
    },
  ]