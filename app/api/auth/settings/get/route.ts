import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/db";
import Setting from "@/src/model/settings.model";

export async function POST(req: NextRequest) {
    try {
        const { ownerId } = await req.json();

        if (!ownerId) {
            return NextResponse.json(
                { message: "Owner Id is required" },
                { status: 400 }
            );
        }

        await connectToDB();

        const setting = await Setting.findOne({
            ownerId,
        });

        console.log("FOUND SETTING:", setting);

        return NextResponse.json(
            {
                success: true,
                setting,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("GET SETTINGS ERROR:", error);

        return NextResponse.json(
            { message: `get settings error ${error}` },
            { status: 500 }
        );
    }
}