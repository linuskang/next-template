import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

    const spec = {
        openapi: '3.0.0',

        info: {
            title: 'Example app api',
            version: 'v1',
        },

        tags: [
            {
                name: 'Auth',
                description: 'Authentication related endpoints'
            },
            {
                name: 'User',
                description: 'User profile related endpoints'
            },
            {
                name: 'Misc',
                description: 'Miscellaneous endpoints'
            },
        ],

        paths: {
            '/api/user': {
                patch: {
                    tags: ['User'],
                    responses: {
                        '200': {
                            description: 'User profile settings have been successfully updated'
                        },

                        '401': {
                            description: 'Unauthorized'
                        },

                        '500': {
                            description: 'Internal server error'
                        }
                    }
                }
            },

            '/api': {
                get: {
                    tags: ['Misc'],
                    responses: {
                        '200': {
                            description: 'App information'
                        },

                        '500': {
                            description: 'Internal server error'
                        }
                    }
                }
            },

            '/api/openapi': {
                get: {
                    tags: ['Misc'],
                    responses: {
                        '200': {
                            description: 'OpenAPI specification'
                        },

                        '500': {
                            description: 'Internal server error'
                        }
                    }
                }
            },

            '/api/auth/[...nextauth]': {
                get: {
                    tags: ['Auth'],
                    responses: {
                        '200': {
                            description: 'NextAuth authentication endpoint'
                        },
                        '500': {
                            description: 'Internal server error'
                        },
                    }
                }
            }

        }
    }

    return NextResponse.json(
        spec,
        { status: 200 }
    )

}