import NextAuth from 'next-auth';
import { DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       role: string;
//     } & DefaultSession['user'];
//   }
// }

// this works
declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & { id: string; role: string };
  }
  interface User extends DefaultUser {
    role: string;
  }
}
