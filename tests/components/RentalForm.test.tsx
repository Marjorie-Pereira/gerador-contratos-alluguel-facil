import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchViaCep } from "@/lib/utils";
import RentalForm from "@/components/RentalForm";
import { TooltipProvider } from "@/components/ui/tooltip";

vi.mock("@/lib/utils", () => ({
  fetchViaCep: vi.fn(),
}));

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();

  return {
    ...actual,
  };
});

describe("RentalForm", () => {
  it("should display error message if CPF field gets invalid input", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );

    const locadorDocumentoInput =
      screen.getAllByPlaceholderText("000.000.000-00")[0];
    const locatarioDocumentoInput =
      screen.getAllByPlaceholderText("000.000.000-00")[1];

    const submitBtn = screen.getByRole("button", { name: "gerar contrato" });

    await user.type(locadorDocumentoInput, "123.456.789-10");
    await user.type(locatarioDocumentoInput, "123.456.789-10");
    await user.click(submitBtn);

    const error = await screen.findAllByText(/Formato inválido/i);

    expect(error[0]).toBeInTheDocument();
    expect(error[1]).toBeInTheDocument();
  });

  it("should display RG input field when user interacts with toggle component", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );
    const toggleItem = screen.getAllByLabelText("toggle RG")[0];
    await user.click(toggleItem);

    expect(
      await screen.findByPlaceholderText("0000000000"),
    ).toBeInTheDocument();
  });

  it("should display error message if RG field input is too short", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );

    const toggleItem = screen.getAllByLabelText("toggle RG")[0];
    const submitBtn = screen.getByRole("button", { name: "gerar contrato" });

    await user.click(toggleItem);

    const rgInput = await screen.findByPlaceholderText("0000000000");

    await user.type(rgInput, "123");
    await user.click(submitBtn);

    const error = (await screen.findAllByText(/Formato inválido/i)).at(0);

    expect(error).toBeInTheDocument();
  });
});
