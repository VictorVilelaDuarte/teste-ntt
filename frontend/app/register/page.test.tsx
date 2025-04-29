import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterPage from "./page";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import api from "../../lib/api";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../lib/api", () => ({
  post: jest.fn(),
}));

describe("RegisterPage", () => {
  const push = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  it("should render all inputs", () => {
    render(<RegisterPage />);
    expect(screen.getByPlaceholderText("Nome")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Senha")).toBeInTheDocument();
  });

  it("should show validation errors", async () => {
    render(<RegisterPage />);
    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));
    await waitFor(() => {
      expect(screen.getByText("Nome obrigatório")).toBeInTheDocument();
      expect(screen.getByText("E-mail inválido")).toBeInTheDocument();
      expect(screen.getByText(/Senha obrigatória/i)).toBeInTheDocument();
    });
  });

  it("should redirect to login page after success register", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({});
    render(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText("Nome"), {
      target: { value: "Usuário" },
    });
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "teste@exemplo.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Senha"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrar/i }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/login");
    });
  });
});
