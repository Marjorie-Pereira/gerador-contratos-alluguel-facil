import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/LoginForm";
import { login } from "@/app/actions/auth";

vi.mock("@/app/actions/auth", () => ({
  login: vi.fn(),
}));

describe("LoginForm", () => {
  it("should display an error when login fails with invalid credentials", async () => {
    const user = userEvent.setup();

    vi.mocked(login).mockResolvedValue({
      success: false,
      code: "invalid_credentials",
    });

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "test@email.com");
    await user.type(screen.getByLabelText(/senha/i), "12345678");

    await user.click(
      screen.getByRole("button", { name: /entrar no sistema/i }),
    );

    expect((await screen.findAllByRole("alert")).at(0)).toHaveTextContent(
      "Credenciais inválidas",
    );
    expect(login).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "12345678",
      keepLogged: false,
    });
  });

  it("should display error message when user inputs invalid email address", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "test");
    await user.type(screen.getByLabelText(/senha/i), "12345678");

    await user.click(
      screen.getByRole("button", { name: /entrar no sistema/i }),
    );

    expect((await screen.findAllByRole("alert")).at(0)).toHaveTextContent(
      "E-mail inválido",
    );
  });

  it("should display error message when user inputs invalid password", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText(/e-mail/i), "test@email.com");
    await user.type(screen.getByLabelText(/senha/i), "123");

    await user.click(
      screen.getByRole("button", { name: /entrar no sistema/i }),
    );

    expect((await screen.findAllByRole("alert")).at(0)).toHaveTextContent(
      "Deve ter no mínimo 8 caracteres",
    );
  });

  it("should display error message when user sends empty fields", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(
      screen.getByRole("button", { name: /entrar no sistema/i }),
    );

    expect((await screen.findAllByRole("alert")).at(0)).toHaveTextContent(
      "E-mail inválido",
    );
    expect((await screen.findAllByRole("alert")).at(1)).toHaveTextContent(
      "Deve ter no mínimo 8 caracteres",
    );
  });
});
