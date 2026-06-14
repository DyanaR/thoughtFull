import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/users";

function AuthRedirectPage() {
  const {
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
  } = useAuth0();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    const checkUser = async () => {
      try {
        if (!isAuthenticated) {
          await loginWithRedirect();
          return;
        }

        const token = await getAccessTokenSilently();
        const backendUser = await getCurrentUser(token);

        if (backendUser.name && backendUser.name.trim()) {
          navigate("/home", { replace: true });
        } else {
          navigate("/name", { replace: true });
        }
      } catch (err) {
        console.error("Auth redirect failed:", err);
        navigate("/", { replace: true });
      }
    };

    checkUser();
  }, [
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    loginWithRedirect,
    navigate,
  ]);

  return <p>Loading...</p>;
}

export default AuthRedirectPage;
