// components/withAuth.tsx
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
      } else {
        setIsAuthenticated(true);
      }
    }, [router]);

    if (isAuthenticated === null) return null;

    return <WrappedComponent {...props} />;
  };
}
