// import { HomeModernIcon } from "@heroicons/react/24/solid";
"use client";
import Link from "next/link";
import Image from "next/image";
import terramoLogo from "@/../public/assets/images/terramo.svg";
// import { usePathname } from "next/navigation";
// import MobileNavbar from "./MobileNavbar";
// import ThemeSwitcher from "./ThemeSwitcher";
// import AuthAvatar from "@/components/shared/navbar/AuthAvatar";
import { useAuthNavigation } from "@/hooks/useAuthNavigation";
import { Button } from "@mui/material";
export default function Navbar() {
    // const pathname = usePathname();
    const { handleLogout, filteredNavLinks, isAuthenticated } = useAuthNavigation();
	return (
		<nav className="flex-between bg-baby_rich border-b-platinum shadow-platinum fixed z-50 w-full gap-5 border-b-2 p-4 sm:p-6 lg:px-12 dark:border-b-0 dark:shadow-none">
			<Link href="/" className="flex items-center">
				<Image src={terramoLogo} alt="Terramo Logo" className="site-logo" priority/>
				
			</Link>
            
			<div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                
            
				{isAuthenticated ? (
				<div className="flex gap-3">
                    <Link href="/dashboard" className="flex items-center">
                        Dashboard
                    </Link>
					<Link href="/clients" className="flex items-center">
                        Clients
                    </Link>
                    <Link href="/clients/create-client" className="flex items-center">
                        Create Client
                    </Link>
					<Button
						onClick={handleLogout}
						className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none"
					>
						Log Out
					</Button>
				</div>
			) : (
				<div className="flex gap-3">
					<Link href="/login">
						<Button className="lime-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
							Login
						</Button>
					</Link>
					<Link href="/register">
						<Button className="electricIndigo-gradient small-medium light-border-2 btn-tertiary text-baby_ballon min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
							Register
						</Button>
					</Link>
				</div>
			)}
			</div>
		</nav>
	);
}