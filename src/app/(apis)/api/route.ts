import { NextRequest, NextResponse } from 'next/server';

var env = process.env;

export async function GET(req: NextRequest) {
    return NextResponse.json(
        {
            version: env.version,
            docs: '/api/docs',
            license: env.LICENSE
        }
    )
}