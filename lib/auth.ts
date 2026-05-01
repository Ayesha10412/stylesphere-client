"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/* =========================
   GET SESSION (ONLY IMPORTANT FUNCTION)
========================= */
export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
/* =========================
   REQUIRE AUTH (protect pages)
========================= */
export async function requireAuth() {
  const user = await getSession();

  if (!user) {
    redirect("/auth/signin");
  }

  return user;
}

/* =========================
   LOGOUT (simple)
========================= */
export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  redirect("/auth/signin");
}
