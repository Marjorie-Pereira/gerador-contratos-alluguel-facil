import { vi, describe, it, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fetchViaCep } from "@/lib/utils";
import RentalForm from "@/components/RentalForm";
import { TooltipProvider } from "@/components/ui/tooltip";
import { en } from "zod/v4/locales";

vi.mock("@/lib/utils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/utils")>();

  return {
    ...actual,
    fetchViaCep: vi.fn(),
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

  it("should fetch for CEP when user types and focus on another field", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchViaCep).mockResolvedValue({
      logradouro: "Praça da Sé",
      bairro: "Sé",
      localidade: "São Paulo",
      cep: "01001-000",
      uf: "SP",
    });

    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );
    const cepInputField = screen.getAllByLabelText(/cep/i)[0];

    await user.type(cepInputField, "01001000");
    await user.tab();

    expect(fetchViaCep).toHaveBeenCalledWith("01001000");
  });

  it("should update address field values when fetchViaCep responds", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchViaCep).mockResolvedValue({
      logradouro: "Praça da Sé",
      bairro: "Sé",
      localidade: "São Paulo",
      cep: "01001-000",
      uf: "SP",
    });

    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );
    const cepInputField = screen.getAllByLabelText(/cep/i)[0];

    await user.type(cepInputField, "01001000");
    await user.tab();

    expect(fetchViaCep).toHaveBeenCalledWith("01001000");
    expect((await screen.findAllByLabelText(/logradouro/i)).at(0)).toHaveValue(
      "Praça da Sé",
    );
    expect((await screen.findAllByLabelText(/bairro/i)).at(0)).toHaveValue(
      "Sé",
    );
    expect((await screen.findAllByLabelText(/cidade/i)).at(0)).toHaveValue(
      "São Paulo",
    );
    expect(cepInputField).toHaveValue("01001-000");
  });

  it("should render loading component when fetching for CEP", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );
    let resolvePromise: (value: any) => void;
    vi.mocked(fetchViaCep).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
    );

    const cepInputField = screen.getAllByLabelText(/cep/i)[0];

    await user.type(cepInputField, "01001000");
    await user.tab();

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("should test if address fields remain empty when fetchViaCep returns error", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );
    vi.mocked(fetchViaCep).mockResolvedValue({ erro: "true" });

    const cepInputField = screen.getAllByLabelText(/cep/i)[0];

    await user.type(cepInputField, "12345678");
    await user.tab();

    expect((await screen.findAllByLabelText(/logradouro/i)).at(0)).toHaveValue(
      "",
    );
    expect(fetchViaCep).toHaveBeenCalledWith("12345678");
  });

  it("should display error message if fimContrato date is before inicioContrato", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <RentalForm />
      </TooltipProvider>,
    );

    await user.type(screen.getByLabelText(/início do contrato/i), "2026-11-19");

    await user.type(
      screen.getByLabelText(/término do contrato/i),
      "2026-10-19",
    );

    const endDate = screen.getByLabelText(/término do contrato/i);

    await user.clear(endDate);
    await user.type(endDate, "2026-10-19");

    user.keyboard("{Enter}");
    const error = (await screen.findAllByRole("alert")).at(-1);

    expect(error?.textContent).toBe(
      "A data de fim do contrato deve ser posterior à data de início do contrato",
    );
  });
});
