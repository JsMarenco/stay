// Third-party dependencies
import { useState, useEffect } from "react";
import axios from "axios";

// Current project dependencies
import type { User } from "../schemas/user.ts";

export default function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMainUser = async () => {
    try {
      const response = await axios.get("/api/users/me", {
        withCredentials: true,
      });

      setUser(response.data?.data || null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, fetchMainUser };
}
