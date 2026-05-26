import Settings from "@/src/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/app/lib/db";

function createResponse(data: any, status = 200) {
    const response = NextResponse.json(data, { status });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
}

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json();

        console.log("CHAT REQUEST:", { message, ownerId });

        if (!message || !ownerId) {
            return createResponse(
                {
                    success: false,
                    message: "Message and OwnerId are required",
                },
                400
            );
        }

        await connectToDB();

        const setting = await Settings.findOne({ ownerId });

        if (!setting) {
            return createResponse(
                {
                    success: false,
                    message: "Chat bot is not configured yet.",
                },
                400
            );
        }

        const greetings = [
            "hi",
            "hello",
            "hey",
            "hii",
            "good morning",
            "good evening",
        ];

        if (greetings.includes(message.toLowerCase().trim())) {
            return createResponse({
                success: true,
                answer: `Hello! Welcome to ${setting.businessName}. How can I help you today?`,
            });
        }

        const knowledge = `
Business Name: ${setting.businessName || "Not Provided"}

Support Email: ${setting.supportEmail || "Not Provided"}

Knowledge:
${setting.knowledge || "Not Provided"}
`;

        const prompt = `
You are HelpNova, an AI customer support assistant.

Your job is to answer customer questions using ONLY the business information provided below.

Rules:
1. Use only the provided business information.
2. Do not make up policies, prices, warranties, discounts, stock availability, delivery dates, or company details.
3. Be polite, professional, and concise.
4. If the answer is not available in the business information, respond exactly with:
Please contact support.
5. Only show a welcome message when the customer greets you.
6. Do NOT include the welcome message when answering normal business questions.

========================
BUSINESS INFORMATION
========================

${knowledge}

========================
CUSTOMER QUESTION
========================

${message}

========================
RESPONSE
========================
`;

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        return createResponse({
            success: true,
            answer: res.text,
        });
    } catch (error) {
        console.error("CHAT ERROR:", error);

        return createResponse(
            {
                success: false,
                message: `chat error ${error}`,
            },
            500
        );
    }
}

export async function OPTIONS() {
    return createResponse({}, 200);
}