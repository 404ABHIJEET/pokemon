import { da } from "@faker-js/faker"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    try {

        const searchParams = request.nextUrl.searchParams
        let page = parseInt(searchParams.get("page") || "1")

        let limit = 10

        if(page == 1) limit = 20
        else page++

        let photos = []
        for(let i=(page-1)*limit; i<limit*page; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}`)
            const data = await response.json()
            photos.push({
                "name": data.name,
                "photo": data.sprites.front_shiny 
            })
        }
        return NextResponse.json({
            photos
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            "error": "error"
        }, {status: 500})
    }
}