import { NextRequest, NextResponse } from "next/server"
import Cake from "@/models/cakes"
import { format, parseISO } from "date-fns"

import connectMongoDB from "@/lib/mongodb"

interface RequestBody {
  name: string
  date: string
  hint: string
}
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await connectMongoDB();

    const { name, date, hint } = await request.json() as RequestBody;

    const createdCake = await Cake.create({ name, date, hint });

    const responseMessage = {
      message: "Cake Created",
      new_cake: createdCake // return the created cake from database, it will include id and other fields that were not in the request but are added by mongodb
    };

    return NextResponse.json(responseMessage, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.error(message);
    return NextResponse.json({ message: "Error occurred: " + message }, { status: 500 });
  }
}



export async function GET(): Promise<NextResponse> {
  try {
    await connectMongoDB()
    const cakes = await Cake.find()

    return NextResponse.json({ cakes })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "An error occurred"
    console.error(message)
    return NextResponse.json(
      { message: "Error occurred: " + message },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const id = request.nextUrl.searchParams.get("id")
  await connectMongoDB()
  await Cake.findByIdAndDelete(id)
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 })
}
