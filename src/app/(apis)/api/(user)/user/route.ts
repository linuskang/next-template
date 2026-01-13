import { auth } from "@/server/auth/";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {

    const session = await auth();

    if (!session?.user?.id) {

        return NextResponse.json(
            {
                success: false,
                error: "Unauthorized"

            },
            { status: 401 }
        );

    };

    try {
        const { name, handle } = await request.json();

        const updatedUser = await db.user.update(
            {
                where: {
                    id: session.user.id
                },
                data: {
                    name: name || undefined,
                    handle: handle || undefined,
                },
            }
        );

        return NextResponse.json(
            {
                success: true,
                user: updatedUser
            },
            { status: 200 }
        );

    }

    catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Failed to update user"
            },
            { status: 500 }
        );
    }
}