"use client"
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Check from "./components/Icons/Check";
import provider from "./services/firebaseAuth";
import api from "./services/api";

function Home() {
  const [hasToken, setHasToken] = useState(false);
  const [user, setUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setHasToken(Boolean(localStorage.getItem("userToken")));
    }
    else {
      api.post("/users/login", { name: user.displayName, email: user.email })
        .then(res => {
          localStorage.setItem("userToken", res.data.token);
          router.push("/home");
          //router.refresh();
        })
        .catch(({ response }) => {
          if (response.data.errors) {
            for (const error of response.data.errors) {
              toast(error, { hideProgressBar: true, autoClose: 5000, type: "error", position: toast.POSITION.BOTTOM_LEFT });
            }
          }
          else {
            toast(response.data.error, { hideProgressBar: true, autoClose: 5000, type: "error", position: toast.POSITION.BOTTOM_LEFT });
          }
        });
    }
  }, [user]);

  const handleMicrosoftLogin = async () => {
    try {
      const auth = getAuth();
      // Initiate the Microsoft login flow
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen h-full flex flex-col items-center bgRedOrange">
      <div className="mt-10 mx-14 flex items-center justify-center">
        <img src="/images/icon_white.svg" alt="InnoScope icon" className="w-24 md:w-32 lg:w-36" />
        <h1 className="mx-4 text-3xl md:text-6xl colorWhite fontMarkProBold">InnoScope</h1>
      </div>

      <div className="w-10/12 mt-8 md:w-6/12 lg:w-5/12 p-4 lg:px-6 rounded-sm bgWhite">
        <p className="text-center mt-2 mb-6 text-3xl md:text-4xl colorRedOrange fontMarkProMed">Features</p>
        <div className="flex mb-4">
          <Check />
          <p className="w-10/12 px-3 text-base md:text-xl fontInterReg">
            <span className="fontInterSB">Generate new ideas! </span>
            Keep the innovation alive by sending new ways to innovate inside the company.</p>
        </div>
        <div className="flex mb-4">
          <Check />
          <p className="w-10/12 px-3 text-base md:text-xl fontInterReg">
            <span className="fontInterSB">You decide! </span>
            By voting on other&apos;s ideas, you help the team deciding which ideas should be implemented.</p>
        </div>
        <div className="flex mb-4">
          <Check />
          <p className="w-10/12 px-3 text-base md:text-xl fontInterReg">
            <span className="fontInterSB">Collaborate! </span>
            Help ideas to be implemented by integrating teams.</p>
        </div>
      </div>

      <div className="mt-12 w-8/12 md:w-4/12">
        {hasToken ?
          <Link href="/home">
            <button className="w-full h-12 rounded-sm bgBlack colorWhite fontMarkProMed"> Start now </button>
          </Link> :
          <button className="w-full h-12 rounded-sm bgBlack colorWhite fontMarkProMed" onClick={handleMicrosoftLogin}> Login with Microsoft </button>
        }
      </div>
      <ToastContainer />
    </main>
  );
};

export default Home;