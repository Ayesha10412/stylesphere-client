/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import api from "@/config/api";
import { redirect } from "next/navigation";

/**
 * LOGIN
 * Calls backend → backend sets httpOnly cookies
 */
export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await api.post(
      "/login",
      { email, password },
      {
        withCredentials: true,
      }
    );

    redirect("/");
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
}

/**
 * LOGOUT
 * Backend clears cookies
 */
export async function logout() {
  try {
    await api.post("/logout", null, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    redirect("/login");
  }
}

/**
 * GET CURRENT USER (SERVER SIDE)
 * Calls backend /me
 */
export async function getSession() {
  try {
    const res = await api.get("/me", {
      withCredentials: true,
    });

    return res.data; // user object
  } catch {
    return null;
  }
}

/**
 * REQUIRE AUTH (for server components / pages)
 */
export async function requireAuth() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return user;
}

/**
 * OPTIONAL: CHECK AUTH (boolean)
 */
export async function isAuthenticated() {
  const user = await getSession();
  return !!user;
}