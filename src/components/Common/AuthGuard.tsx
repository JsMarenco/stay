// Third-party dependencies
import { useEffect } from "react";

// Current project dependencies
import useAuth from "../../hooks/useAuth.tsx";

export default function AuthGuard() {
  const { user, loading, fetchMainUser } = useAuth();

  useEffect(() => {
    fetchMainUser();

    console.log("ewkhhwewhje");

    if (!loading && !user) {
      window.location.href = "/auth/login";
    }
  }, []);

  return <div className="hidden">hello</div>;
}
