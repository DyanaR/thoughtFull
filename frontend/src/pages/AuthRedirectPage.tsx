import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/users";

function AuthRedirectPage() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = await getAccessTokenSilently();
      const backendUser = await getCurrentUser(token);

      if (backendUser.name && backendUser.name.trim()) {
        navigate("/home", { replace: true });
      } else {
        navigate("/name", { replace: true });
      }
    };

    checkUser();
  }, [getAccessTokenSilently, navigate]);

  return <p>Loading...</p>;
}

export default AuthRedirectPage;
