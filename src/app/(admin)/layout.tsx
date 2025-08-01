
import Header from "@/components/shared/header/header";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

export default function layout({ children }: LayoutProps) {
	return (
		<><Header />
		<main  >
			
			<div className="flex-center">
				 {/* flex-col px-4 pb-6 pt-24 sm:px-6 lg:px-8 lg:pt-32 */}
				<section className="flex min-h-screen">
					<div>{children}</div>
				</section>
			
			</div>
		</main>
		</>
	);
}