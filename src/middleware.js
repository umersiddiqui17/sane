import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import React from 'react'

export default async function middleware(req) {
    const path =req.nextUrl.pathname
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })
    const PublicPath = path === '/login' || path ==='/signup'
    if(PublicPath && token){
        return NextResponse.redirect(new URL("/",req.nextUrl))
    }
    if(!PublicPath &&!token){
        return NextResponse.redirect(new URL("/login",req.nextUrl))
    }
 
}
export const config = {
    matcher: ['/','/profile/:path*','/signup','/login']
}