import React, { useEffect } from "react";
import Router from "next/router";

import { useAuth0 } from "@auth0/auth0-react";

import RondayLoading from "../../components/RondayLoading/RondayLoading";
import { DefaultError, EmailVerification } from "../../components/Errors";


function Verification() {
  const { isAuthenticated, error } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  function getErrorComponent(error) {
    if (!error) {
      return <RondayLoading />;
    }

    return error.message === "Please verify your email before logging in."  
      ? <EmailVerification/>
      : <DefaultError msg={error.message}/>
  }

  return isAuthenticated ? <></> : getErrorComponent(error);
}

export default Verification;
