import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./page";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../lib/api", () => ({
  post: jest.fn(),
}));

describe("LoginPage", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it("shoul render inputs and button", () => {
    render(<LoginPage />);
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("should show the credential error", async () => {
    (api.post as jest.Mock).mockRejectedValueOnce(new Error("Unauthorized"));
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "email@teste.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(screen.getByText("Email ou senha inválidos")).toBeInTheDocument();
    });
  });

  it("should redirect on success login", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "abc123" },
    });
    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "email@teste.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /entrar/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/dashboard");
    });
  });
});
