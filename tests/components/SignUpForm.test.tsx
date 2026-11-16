import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { signup } from "@/app/actions/auth";
import SignUpForm from "@/components/SignUpForm";

vi.mock("@/app/actions/auth", () => ({
  signup: vi.fn(),
}));

describe("SignUpForm", () => {
  it("should display error message for invalid email", async () => {
    const user = userEvent.setup();

    vi.mocked(signup).mockResolvedValue({
      success: false,
      code: "email_address_invalid",
    });

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/Nome completo/i), "Test User");
    await user.type(screen.getByLabelText(/e-mail/i), "test@test.com");
    await user.type(screen.getAllByLabelText(/senha/i)[0], "testpassword123");
    await user.type(
      screen.getByLabelText(/confirmar senha/i),
      "testpassword123",
    );

    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "E-mail inválido",
    );

    expect(signup).toHaveBeenCalledWith({
      username: "Test User",
      email: "test@test.com",
      password: "testpassword123",
      confirmPassword: "testpassword123",
    });
  });

  it("should display error message for already registered email", async () => {
    const user = userEvent.setup();
    vi.mocked(signup).mockResolvedValue({
      success: false,
      code: "email_exists",
    });

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/Nome completo/i), "Test User");
    await user.type(screen.getByLabelText(/e-mail/i), "teste@teste.com");
    await user.type(screen.getAllByLabelText(/senha/i)[0], "testpassword123");
    await user.type(
      screen.getByLabelText(/confirmar senha/i),
      "testpassword123",
    );

    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "E-mail já cadastrado",
    );

    expect(signup).toHaveBeenCalledWith({
      username: "Test User",
      email: "teste@teste.com",
      password: "testpassword123",
      confirmPassword: "testpassword123",
    });
  });

  it("should display error message when passwords do not match", async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/Nome completo/i), "Test User");
    await user.type(screen.getByLabelText(/e-mail/i), "teste@teste.com");
    await user.type(screen.getAllByLabelText(/senha/i)[0], "testpassword123");
    await user.type(
      screen.getByLabelText(/confirmar senha/i),
      "differentpassword123",
    );

    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "As senhas devem ser iguais!",
    );
  });

  it("should display error message when password is too short", async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/Nome completo/i), "Test User");
    await user.type(screen.getByLabelText(/e-mail/i), "teste@teste.com");
    await user.type(screen.getAllByLabelText(/senha/i)[0], "test");
    await user.type(screen.getByLabelText(/confirmar senha/i), "test");

    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Deve ter no mínimo 8 caracteres",
    );
  });

  it("should display error message when a required field is empty", async () => {
    const user = userEvent.setup();

    render(<SignUpForm />);

    await user.type(screen.getByLabelText(/Nome completo/i), " ");
    await user.type(screen.getByLabelText(/e-mail/i), " ");
    await user.type(screen.getAllByLabelText(/senha/i)[0], " ");
    await user.type(screen.getByLabelText(/confirmar senha/i), " ");

    await user.click(screen.getByRole("checkbox"));

    await user.click(screen.getByRole("button"));

    expect(await screen.findByText("Preencha este campo"));
  });
});
