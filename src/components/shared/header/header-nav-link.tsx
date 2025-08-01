import Link from 'next/link'
import Button from '@mui/material/Button'

interface NavLinkProps {
  href: string
  label: string
  currentPath: string
}

const NavLink = ({ href, label, currentPath }: NavLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Button
        component="a"
        color="inherit"
        sx={currentPath === href ? { fontWeight: 'bold' } : {}}
      >
        {label}
      </Button>
    </Link>
  )
}

export default NavLink
