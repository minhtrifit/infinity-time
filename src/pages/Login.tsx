import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { Flex, Text, Button, Center } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import clockAnimation from "../../src/assets/clock.json";
import { auth } from "../config/firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const clockReft = useRef<LottieRefCurrentProps>(null);
  const provider = new GoogleAuthProvider();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;

        const data = {
          uid: uid,
          displayName: displayName,
          email: email,
          photoURL: photoURL,
        };

        dispatch({ type: "user/loginGmail", payload: data });
        navigate("/home");
      } else {
        console.log("user is logged out");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (type: string) => {
    if (type === "google") {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          const { uid, email, displayName, photoURL } = user;

          const data = {
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          };

          dispatch({ type: "user/loginGmail", payload: data });
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <Flex w="full" display={"flex"} flexDirection={"column"}>
      <Flex
        margin="150px auto 0 auto"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Text
          fontSize={{ base: "20px", md: "25px", xl: "30px" }}
          textColor="cyan.400"
          fontWeight={"bold"}
        >
          Infinity Time
        </Text>
        <Text
          fontSize={{ base: "25px", md: "40px", xl: "50px" }}
          textAlign="center"
          fontWeight={"bold"}
        >
          MAKE YOUR TIME UNLIMITED
        </Text>
      </Flex>
      <Lottie
        style={{
          width: "300px",
          height: "300px",
          margin: "0 auto",
        }}
        animationData={clockAnimation}
        lottieRef={clockReft}
      />
      <Flex
        width={{ base: "80%", sm: "50%", md: "40%", xl: "20%" }}
        margin={"10px auto"}
      >
        <Button
          w={"full"}
          variant={"outline"}
          leftIcon={<FcGoogle />}
          onClick={() => {
            handleLogin("google");
          }}
        >
          <Center>
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
