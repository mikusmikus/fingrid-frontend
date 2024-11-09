import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useUser } from '@/providers/user-provider';

import { Button } from './button/button';
import { Container } from './container';
import { SvgAddFilled1, SvgMenu } from './icons';

const links = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Releases',
    href: '/releases',
  },
  {
    label: 'Ideas',
    href: '/ideas',
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('fingridAccount');
    router.push('/login');
  };

  const { user } = useUser();

  return (
    <nav className="w-full bg-neutral-300/80 backdrop-blur-sm">
      <Container className="flex items-center justify-between py-2">
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <SvgMenu className="size-6" />
        </Button>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex md:items-center md:gap-10">
          {links.map((link) => (
            <NavLink key={link.href} {...link} pathname={pathname} />
          ))}
        </ul>

        {/* Create Ticket Button - Always Visible */}
        {user && (
          <Button
            as={Link}
            href="/create-ticket"
            iconLeft={<SvgAddFilled1 />}
            size="lg"
            className="ml-auto min-w-[140px] whitespace-nowrap"
          >
            Create Ticket
          </Button>
        )}

        {user ? (
          <Button
            onClick={handleLogout}
            variant="secondary-dark"
            className="ml-4 hidden lg:inline-flex"
          >
            Logout
          </Button>
        ) : (
          <Button
            as={Link}
            href="/login"
            variant="secondary-dark"
            className="ml-4"
          >
            Login
          </Button>
        )}
      </Container>

      {/* Mobile Navigation Dropdown */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        className="overflow-hidden md:hidden"
      >
        <ul className="flex flex-col space-y-2 p-2">
          {links.map((link) => (
            <NavLink
              key={link.href}
              {...link}
              pathname={pathname}
              onClick={() => setIsOpen(false)}
            />
          ))}
          {user && (
            <li>
              <Button
                onClick={handleLogout}
                variant="secondary-dark"
                className="text-p-reg-sm"
              >
                Logout
              </Button>
            </li>
          )}
        </ul>
      </motion.div>
    </nav>
  );
}

// Extracted NavLink component for reuse
interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  onClick?: () => void;
}

function NavLink({ href, label, pathname, onClick }: NavLinkProps) {
  const isActive = pathname === href;

  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`relative px-3 py-2 text-p-reg-md font-medium transition-colors ${
          isActive ? 'text-red' : 'text-foreground/80 hover:text-foreground'
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="active-tab"
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-red"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </Link>
    </motion.li>
  );
}
