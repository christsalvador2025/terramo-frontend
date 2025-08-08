"use client"
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
 import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/navigation"; 
import HeaderLogo from "./header-logo";
import NavLink from "./header-nav-link";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import Link from "next/link";

export default function Header() {
   
  const router = useRouter();
  const { handleLogout, filteredNavLinks, isAuthenticated } = useAuthNavigation();
  const handleLogin = () => {
    router.push("/login");
  };
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   router.push("/login");
  // };

  // const handleLogin = () => {
  //   router.push("/login");
  // };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Stack direction="row" spacing={2}>
              <HeaderLogo />
            
              {/* <Link
                href="/upload"
    
              >
                Upload
              </Link> */}
            </Stack>

                 {/* Right: Settings + Auth Button */}
            <Stack direction="row" alignItems="center" spacing={3}>
              {isAuthenticated && (
                <Link
                  href="/settings"
                  className="flex items-center text-sm text-[#026770] hover:underline"
                >
                  <SettingsIcon fontSize="small" className="mr-1" />
                  Einstellungen
                </Link>
              )}

              <Link
                  href="/login"
                  
                >
                <Button
                  style={{ background: "none", color: "#026770", textTransform: "none" }}
                  startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
                  onClick={isAuthenticated ? handleLogout : handleLogin}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </Button>
              </Link>
            </Stack>

            {/* <Button
              style={{background: "#026770", color: "#FFFF"}}
              startIcon={isAuthenticated ? <LogoutIcon /> : <LoginIcon />}
              onClick={isAuthenticated ? handleLogout : handleLogin}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </Button> */}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

 
