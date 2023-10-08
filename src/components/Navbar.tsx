import {
  Button,
  Flex,
  Avatar,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

import { RootState } from "../redux/store";

import { useSelector } from "react-redux";

interface PropType {
  colorMode: string;
  toggleColorMode: any;
}

const Navbar = (props: PropType) => {
  const { colorMode, toggleColorMode } = props;

  const navigate = useNavigate();

  const photoURL = useSelector<RootState, string>(
    (state) => state.user.photoURL
  );

  const displayName = useSelector<RootState, string>(
    (state) => state.user.displayName
  );

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      pos="absolute"
      right={0}
      display={"flex"}
      alignItems={"center"}
      p={5}
      gap={5}
    >
      <Button
        aria-label="Toggle Color Mode"
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        w="fit-content"
      >
        {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
      </Button>
      {displayName && (
        <Box>
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar name={displayName} size={"md"} src={photoURL} />
            </MenuButton>
            <MenuList minW={0} w={150}>
              <MenuItem>Profile</MenuItem>
              <MenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
