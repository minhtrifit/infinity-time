import { Flex, useColorMode } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex h="100vh" pos="relative">
      <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Flex>
  );
};

export default App;
