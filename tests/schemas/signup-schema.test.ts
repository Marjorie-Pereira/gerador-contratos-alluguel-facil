import { signUpFormData, signUpFormSchema } from "@/schemas/signUpFormSchema";
import { zodErrorMessage } from "@/types/errors";
import { it, describe, expect } from "vitest";

describe("signup form schema", () => {
  it("should return success when every field is filled correctly", () => {
    const input: signUpFormData = {
      email: "example@example.com",
      username: "John Doe",
      password: "longenoughpassword",
      confirmPassword: "longenoughpassword",
    };
    const result = signUpFormSchema.safeParse(input);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(input);
    }
  });
  it("should return error if passwords do not match", () => {
    const input: signUpFormData = {
      email: "example@example.com",
      username: "Jhon Doe",
      password: "longenoughpassword",
      confirmPassword: "differentpassword",
    };
    const result = signUpFormSchema.safeParse(input);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    const errorPath: string[] = error.path;

    expect(result.success).toBe(false);
    expect(errorPath.includes("confirmPassword")).toBe(true);
  });
  it("should return error if password is too short", () => {
    const input: signUpFormData = {
      email: "example@example.com",
      username: "John Doe",
      password: "123",
      confirmPassword: "123",
    };
    const result = signUpFormSchema.safeParse(input);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.code).toBe("too_small");
  });
  it("should return error if email is invalid", () => {
    const input: signUpFormData = {
      email: "invalid",
      username: "John Doe",
      password: "longPassword",
      confirmPassword: "longPassword",
    };

    const result = signUpFormSchema.safeParse(input);
    const error: zodErrorMessage = JSON.parse(result.error?.message || "")[0];

    expect(result.success).toBe(false);
    expect(error.path.includes("email")).toBe(true);
  });
  it("should return error if any field is left empty", () => {
    const input: signUpFormData = {
      email: "johndoe@email.com",
      username: "",
      password: "longPassword",
      confirmPassword: "longPassword",
    };

    const result = signUpFormSchema.safeParse(input);

    expect(result.success).toBe(false);
  });
});
