import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { waitlistEntries } from "@/db/schema";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(255),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please provide a valid email address")
    .max(255),
  locale: z.enum(["en", "ar"]).default("en"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const result = waitlistSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "validation_error",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, locale } = result.data;

    // Insert with ON CONFLICT (email) DO NOTHING
    // If a duplicate email is submitted, it does not throw or fail;
    // it returns a friendly success notice to the user.
    const inserted = await db
      .insert(waitlistEntries)
      .values({
        name,
        email,
        locale,
      })
      .onConflictDoNothing({ target: waitlistEntries.email })
      .returning();

    const isNew = inserted.length > 0;

    return NextResponse.json(
      {
        success: true,
        status: isNew ? "created" : "already_registered",
        name,
        email,
      },
      { status: isNew ? 201 : 200 }
    );
  } catch (error) {
    console.error("Waitlist submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "internal_error",
        message: "Failed to record waitlist entry. Please try again.",
      },
      { status: 500 }
    );
  }
}
