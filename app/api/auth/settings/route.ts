import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/db";
import Settings from "@/src/model/settings.model";

export async function POST(req: NextRequest) {
    try {
        const {
            ownerId,
            businessName,
            supportEmail,
            knowledge
        } = await req.json();

        console.log("API HIT");

        await connectToDB();

        console.log("DB CONNECTED");

        const settings = await Settings.findOneAndUpdate(
            { ownerId },
            {
                ownerId,
                businessName,
                supportEmail,
                knowledge
            },
            {
                upsert: true,
                returnDocument: "after"
            }
        );

        console.log("SAVED DATA:", settings);

        return NextResponse.json({
            success: true,
            settings
        });

    } catch (error) {
        console.error("DB ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                error: String(error)
            },
            { status: 500 }
        );
    }
}