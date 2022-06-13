// import { CognitoUserPool } from "amazon-cognito-identity-js";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// const poolData = {
//   UserPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID as string,
//   ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
// };

// const UserPool = new CognitoUserPool(poolData);

// const user = UserPool.getCurrentUser();

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // const { origin } = req.nextUrl;

  // if (user) {
  //   user.getSession((err: any, session: any) => {
  //     if (err) {
  //       console.log(err);
  //       return NextResponse.next();
  //     } else {
  //       console.log(session);
  //       if (session.isValid()) {
  //         return NextResponse.redirect(`${origin}/`);
  //       } else {
  //         return NextResponse.next();
  //       }
  //     }
  //   });
  // }
  return NextResponse.next();
}
