import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db/mongodb";

export type UserRole = "student" | "company";
export type AuthProvider = "credentials" | "github";

export interface UserDoc {
  _id: ObjectId;
  name: string;
  email: string;
  role: UserRole;
  authProvider: AuthProvider;
  passwordHash?: string;
  image?: string | null;
  phone?: string | null;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Career answers captured during student signup (or empty for OAuth signups). */
export interface StudentProfileInput {
  experienceLevel?: string;
  targetRole?: string;
  learningStyle?: string;
  yearsOfExperience?: string;
}

async function users() {
  const db = await getDatabase();
  return db.collection("users");
}

export async function getUserByEmail(email: string): Promise<UserDoc | null> {
  const col = await users();
  return (await col.findOne({ email: email.toLowerCase().trim() })) as
    | UserDoc
    | null;
}

interface CreateStudentArgs {
  name: string;
  email: string;
  passwordHash: string;
  phone?: string | null;
  profile?: StudentProfileInput;
}

/** Creates a credentials-based student user plus their studentProfiles doc. */
export async function createStudent(
  args: CreateStudentArgs,
): Promise<UserDoc> {
  const db = await getDatabase();
  const now = new Date();
  const doc: Omit<UserDoc, "_id"> = {
    name: args.name.trim(),
    email: args.email.toLowerCase().trim(),
    role: "student",
    authProvider: "credentials",
    passwordHash: args.passwordHash,
    phone: args.phone?.trim() || null,
    image: null,
    emailVerified: null,
    createdAt: now,
    updatedAt: now,
  };
  const res = await db.collection("users").insertOne(doc);
  await db.collection("studentProfiles").insertOne({
    userId: res.insertedId,
    ...args.profile,
    createdAt: now,
    updatedAt: now,
  });
  return { _id: res.insertedId, ...doc };
}

/**
 * Finds an existing user by email or creates a student from a GitHub profile.
 * Used by the Auth.js signIn callback so OAuth users land in `users` too.
 */
export async function upsertGithubStudent(args: {
  email: string;
  name?: string | null;
  image?: string | null;
}): Promise<UserDoc> {
  const existing = await getUserByEmail(args.email);
  if (existing) return existing;

  const db = await getDatabase();
  const now = new Date();
  const doc: Omit<UserDoc, "_id"> = {
    name: args.name?.trim() || args.email.split("@")[0],
    email: args.email.toLowerCase().trim(),
    role: "student",
    authProvider: "github",
    image: args.image ?? null,
    phone: null,
    emailVerified: now,
    createdAt: now,
    updatedAt: now,
  };
  const res = await db.collection("users").insertOne(doc);
  await db.collection("studentProfiles").insertOne({
    userId: res.insertedId,
    createdAt: now,
    updatedAt: now,
  });
  return { _id: res.insertedId, ...doc };
}
