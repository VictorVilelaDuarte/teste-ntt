import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextInput from "./TextInput";

describe("TextInput", () => {
  it("shoul render placeholder", () => {
    render(<TextInput placeholder="Digite algo" />);
    expect(screen.getByPlaceholderText("Digite algo")).toBeInTheDocument();
  });

  it("should accept the content", () => {
    render(<TextInput placeholder="Email" />);
    const input = screen.getByPlaceholderText("Email") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "teste@example.com" } });

    expect(input.value).toBe("teste@example.com");
  });

  it("should render error message if provided", () => {
    render(<TextInput placeholder="Senha" errorMessage="Senha inválida" />);

    expect(screen.getByText("Senha inválida")).toBeInTheDocument();
  });
});
