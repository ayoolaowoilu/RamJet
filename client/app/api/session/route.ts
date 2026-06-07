import { NextRequest } from "next/server";


export async function GET(request:NextRequest){
     request.nextUrl.searchParams.get("token")
}