import terramoLogo from "@/../public/assets/images/terramo.svg";
import Image from "next/image";
import Link from "next/link";

const HeaderLogo = () => {
  return (
    <Link href="/clients" >
      <Image 
      src={terramoLogo} 
      alt="Terramo Logo" 
      className="site-logo" 
      priority
      style={{ objectFit: "cover", marginRight: "2rem" }}
      sizes="(max-width: 768px) 100vw, 210px"
      />
    </Link>
  );
};
export default HeaderLogo;
