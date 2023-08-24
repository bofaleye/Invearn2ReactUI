"use-client";

import { AUTH_KEY } from "@/constants/cookieKeys";
import { setCookie, deleteCookie } from "cookies-next";
import Firebase from "../../../firebase.config";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await Firebase.auth().signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    const userToken = await user?.getIdToken();
    //  const tokenExpirationTime = user?.stsTokenManager.expirationTime;
    // let accessToken = userCred.user?.multiFactor?.user?.accessToken
    // let cookieExpiration = res.data?.payload.expiresIn
    //       ? new Date(res.data?.payload.expiresIn)
    //       : undefined;
    let obj = { accessToken: userToken };
    setCookie(AUTH_KEY, obj, { path: '/'});
    return true;
  } catch (err) {
    toast.error("An error occurred while signing you in: " + err, {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};

export const logout =() =>{
    try {
    deleteCookie(AUTH_KEY, { path: '/' });
    return true;
    }
    catch(e){
        console.log(e)
    }
    
}

export const refreshToken = () => {
  Firebase.auth()
    ?.currentUser?.getIdToken(true)
    .then((idToken) => {
      let obj = { accessToken: idToken };
      setCookie(AUTH_KEY, JSON.stringify(obj));
    })
    .catch((error) => {
       redirect('/');
    });
};

export const getUserInfo = () => {
  var user = Firebase.auth()?.currentUser;

  if (user) {
    var email = user.email;
    return { email };
  }
};
