import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  role: "ADMIN" | "USER";
  sub: string;
}

export function getRoleFromToken(token: string): "ADMIN" | "USER" | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export function getUserIdFromToken(token: string): string {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.sub;
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
}
