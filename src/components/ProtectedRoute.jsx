import styled from "styled-components";
import { useUser } from "./useUser";

import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user.
  const { isPending, isAuthenticated } = useUser();

  //2. If there is NO authenticated user, redirect to the login page.
  //3.If there is a user, render the app.
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );

  //4. While loading, show a spinner.
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
