import { vi, describe, it, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormPageHeader from "@/components/FormPageHeader";
import getUserData from "@/app/actions/getUserData";

vi.mock("@/app/actions/getUserData", () => ({
  default: vi.fn(),
}));

describe("FormPageHeader", () => {
  it("should display user full name and email on the drawer", async () => {
    const user = userEvent.setup();
    const userData = {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@email.com",
    };
    render(<FormPageHeader userData={userData} />);

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("heading").textContent).toBe(
      `${userData.first_name} ${userData.last_name}`,
    );

    expect(screen.getByRole("paragraph").textContent).toBe(userData.email);
  });
});
