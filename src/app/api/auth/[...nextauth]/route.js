import { connect } from "@/utils/config/dbConfig"
import User from "@/utils/models/User"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
       name:"credentials",
       credentials:{},
       async authorize(credentials){
        const {email,password} = credentials
        try{
          await connect()
          const user = await User.findOne({email})
          if(!user){
            return null
          }
          const passwordMatch = bcryptjs.compare(password,user.password)
          if (!passwordMatch) {
            return null
          }
          return user
        }catch(error){
          console.log("Error",error)
        }
        
       }

       

    }),
    // ...add more providers here
  ],
  session:{
    strategy:"jwt"
  },

  callbacks:{
    async jwt({token,user}) {
      if (user) {
        token.email = user.email
        token.name = user.name
      }
      return token;
    },

    async session({session,token}){
      if (session.user) {
        session.user.email = token.email;
        session.user.name = token.name;
      }
      console.log(session)
      return session;
    }
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn:"/login"
  },
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}