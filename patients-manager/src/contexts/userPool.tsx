/* eslint-disable react-hooks/exhaustive-deps */
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
} from "amazon-cognito-identity-js";
import { createContext, useState, useEffect, useContext } from "react";
import { IContextProvider } from "../data/interfaces/IContextProvider.interface";
import { IUserpoolProps } from "../data/interfaces/IUserpoolProps";
import { api } from "../data/consts/enviroment/enviroment";
import SnackBarContext from "./snackbar";
import { useRouter } from "next/router";
import PatientsContext from "./patients";

const UserPoolContext = createContext<IUserpoolProps>({} as IUserpoolProps);

export const UserPoolProvider: React.FC<IContextProvider> = ({ children }) => {
  const router = useRouter();
  const {handleOpen} = useContext(SnackBarContext);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { loadPatients } = useContext(PatientsContext);

  let poolData = {
    UserPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID as string,
    ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
  };

  let UserPool = new CognitoUserPool(poolData);

  function getSession() {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.getSession((err: any, session: any) => {
        if (err) {
          console.log(err);
        } else {
          console.log(session);
          if (session.isValid()) {
            console.log("logado");
            setToken(() => session.getIdToken().getJwtToken());
            console.log(session.getIdToken().getJwtToken());
          } else {
            setToken(() => "");
          }
        }
      });
    } else {
      console.log("Não logado");
    }
  }

  function logout() {
    const user = UserPool.getCurrentUser();

    if (user) {
      user.signOut(() => {
        console.log("deslogado");
        setToken(() => "");
      });
    }
  }

  function login(email: string, password: string) {
    setLoading(() => true);

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        setToken(() => data.getIdToken().getJwtToken());
        await router.push("/");
        setLoading(() => false);
      },
      onFailure: (err) => {
        handleOpen(err.message, "error");
        setLoading(() => false);
      },
      newPasswordRequired: (data) => {
        setLoading(() => false);
        console.log("New passord required", data);
      },
    });
  }

  useEffect(() => {
    api.defaults.headers.common["Authorization"] = token;
    loadPatients(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    poolData = {
      UserPoolId: process.env.NEXT_PUBLIC_USERPOOL_ID as string,
      ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
    };
  
    UserPool = new CognitoUserPool(poolData);

    getSession();
    console.log('getting sessions');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserPoolContext.Provider value={{ login, loading, isLoggedIn: token !== "", logout }}>
      {children}
    </UserPoolContext.Provider>
  );
};

export default UserPoolContext;
