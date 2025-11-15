import { auth } from "./app/_library/auth";
export const middleware = auth;
export const config = { matcher: ["/account"] };
