import getAdminData from "@/app/actions/getAdminData";
import { adminData } from "@/lib/constants/mockContractData";
import { formatDateToBrazilian, toCurrencyString } from "@/lib/utils";
import { format } from "date-fns";
import { describe, expect, it } from "vitest";
describe("test functions to used fill pdf document with correct data", () => {
  it("should return mock admin data for demo user", async () => {
    const result = await getAdminData("demo");

    expect(result).toEqual(adminData);
  });
  it("should convert numeric value to brazilian currency string", () => {
    const value = 2000;
    const valueString = toCurrencyString(value);

    expect(valueString).toBe("R$\u00A02.000,00");
  });
  it("should return ISO date string in portuguese long format", () => {
    const dateString = format(new Date(2026, 10, 18), "yyy-MM-dd");

    const formatted = formatDateToBrazilian(dateString);

    expect(formatted).toBe("18 de novembro de 2026");
  });
});
