import { loginFormData, loginFormSchema } from "@/schemas/signUpFormSchema";
import { describe, it, expect } from "vitest";

describe("test login form schema", () => {
  it("should return success when given email and password in the correct format", () => {
    const input: loginFormData = {
      email: "example@email.com",
      password: "12345678",
      keepLogged: true,
    };
    const result = loginFormSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(input);
    }
  });

  it("should return success even when keepLogged is undefined", () => {
    const input: loginFormData = {
      email: "example@email.com",
      password: "12345678",
      keepLogged: undefined,
    };
    const result = loginFormSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(input);
    }
  });

  it("should return error when password is too short", () => {
    const input: loginFormData = {
      email: "test@test.com",
      password: "short",
    };

    const result = loginFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it("should return error when email is invalid", () => {
    const input: loginFormData = {
      email: "test@test",
      password: "longrequiredpassword",
    };

    const result = loginFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });

  it("should return error when fields are empty", () => {
    const input = {
      email: "",
      password: "",
    };

    const result = loginFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });
});
