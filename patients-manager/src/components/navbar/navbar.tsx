import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import Image from "next/image";
import logo from "../../assets/medcloud-long.white.png";
import { SpaceDiv } from "../../styles/components/navbar/style";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import UserPoolContext from "../../contexts/userPool";

const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useContext(UserPoolContext);

  return (
    <AppBar elevation={0} color="primary" position="static">
      <Toolbar>
        <Link href={"https://medcloud.link/"}>
          <a target="_blank" rel="noreferrer">
            <IconButton disableRipple edge="start">
              <Image
                src={logo}
                alt="logo"
                width={150}
                height={30}
                objectFit={"contain"}
              />
            </IconButton>
          </a>
        </Link>
        <SpaceDiv />
        <Link
          href={
            "https://www.linkedin.com/in/matheus-henrique-4474171b3/?locale=en_US"
          }
        >
          <a target="_blank" rel="noreferrer">
            <IconButton className="button-icon" disableRipple edge="start">
              <LinkedInIcon sx={{ color: "white" }}></LinkedInIcon>
            </IconButton>
          </a>
        </Link>
        <Link href={"https://github.com/Matheus-se/development-challenge-two"}>
          <a target="_blank" rel="noreferrer">
            <IconButton className="button-icon" disableRipple edge="start">
              <GitHubIcon sx={{ color: "white" }}></GitHubIcon>
            </IconButton>
          </a>
        </Link>
        {isLoggedIn ? (
          <Button onClick={() => logout()} color="inherit" variant="text">
            Logout
          </Button>
        ) : (
          <Link href={router.pathname == "/" ? "/login" : "/"}>
            <Button color="inherit" variant="text">
              {router.pathname == "/" ? "Login" : "Home"}
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
