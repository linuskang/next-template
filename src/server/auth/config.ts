import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import ResendProvider from "next-auth/providers/resend";
import { Resend } from "resend";

import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      bio: string | null;
      displayName: string | null;
      handle: string | null;
      moderator: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    ResendProvider({
      apiKey: process.env.AUTH_RESEND_KEY!,
      from: "Auth <auth@m.lkang.au>",
      sendVerificationRequest: async ({ identifier: email, url, provider }) => {
        const resend = new Resend(provider.apiKey);

        const { data, error } = await resend.emails.send({
          from: provider.from!,
          to: email,
          subject: "Sign in to My App",
          html: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sign in to My App</title>
              </head>
              <body style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
                
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #2563eb; margin: 0;">My App</h1>
                  <p style="color: #6b7280; margin: 5px 0;">Your personal app experience</p>
                </div>

                <div style="background: #f8fafc; padding: 30px; border-radius: 8px; margin-bottom: 30px;">
                  <h2 style="margin-top: 0;">Welcome!</h2>
                  <p>Click the button below to sign in to your account:</p>
                  <a href="${url}" style="display: inline-block; background-color: #2563eb; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">Sign In</a>
                  <p style="font-size: 14px; color: #6b7280; margin-top: 20px;">This link will expire in 24 hours.</p>
                </div>

                <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; font-size: 14px; color: #6b7280;">
                  <p style="margin: 0;">
                    If you didn't request this, contact us at <a href="mailto:support@myapp.org" style="color: #2563eb;">support@myapp.org</a>.
                  </p>
                </div>

              </body>
            </html>
          `,
        });

        if (error) {
          const errorDetail =
            (typeof error === "string" && error) ||
            (typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof (error as any).message === "string" &&
              (error as any).message) ||
            JSON.stringify(error);

          throw new Error(`Failed to send verification email: ${errorDetail}`);
        }
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
} satisfies NextAuthConfig;
