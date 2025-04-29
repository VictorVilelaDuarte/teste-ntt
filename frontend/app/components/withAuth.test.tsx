import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";
import { withAuth } from "./withAuth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("withAuth HOC", () => {
  const push = jest.fn();
  const replace = jest.fn();

  const MockComponent = () => <div>Componente Protegido</div>;

  const ProtectedComponent = withAuth(MockComponent);

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push, replace });
  });

  it("redireciona para login se não houver token", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    render(<ProtectedComponent />);

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(replace).toHaveBeenCalledWith("/login");
    });
  });

  it("renderiza o componente protegido se o token estiver presente", async () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue("fake-token");

    render(<ProtectedComponent />);

    await waitFor(() => {
      expect(localStorage.getItem).toHaveBeenCalledWith("token");
      expect(screen.getByText("Componente Protegido")).toBeInTheDocument();
    });
  });

  it("exibe null enquanto verifica a autenticação", () => {
    jest.spyOn(Storage.prototype, "getItem").mockReturnValue(null);

    const { container } = render(<ProtectedComponent />);

    expect(container.firstChild).toBeNull();
  });
});
