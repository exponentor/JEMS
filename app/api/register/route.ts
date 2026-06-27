import { NextResponse } from "next/server";
import { isEmailLike, evaluatePassword } from "@/components/signup/password";
import { hashPassword } from "@/lib/auth/password";
import { createStudent, getUserByEmail } from "@/lib/db/users";

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  experienceLevel?: string;
  targetRole?: string;
  learningStyle?: string;
  yearsOfExperience?: string;
}

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").toLowerCase().trim();
  const password = body.password ?? "";

  // Server-side validation — never trust the client form alone.
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!isEmailLike(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }
  if (!evaluatePassword(password, [name, email, body.phone ?? ""]).acceptable) {
    return NextResponse.json(
      { error: "Password does not meet the requirements." },
      { status: 400 },
    );
  }

  if (await getUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists." },
      { status: 409 },
    );
  }

  try {
    await createStudent({
      name,
      email,
      passwordHash: hashPassword(password),
      phone: body.phone,
      profile: {
        experienceLevel: body.experienceLevel,
        targetRole: body.targetRole,
        learningStyle: body.learningStyle,
        yearsOfExperience: body.yearsOfExperience,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
