import { navLink } from "src/types/navLinks/navLinks";

export const navLinks: navLink[] = [
  { name: 'Contacto', path: '/contacto' },
  { name: 'Blog', path: '/blog' },
  { name: 'AboutMe', path: '/about' },
  { name: 'Inicio', path: '/' },
  ];

// eslint-disable-next-line no-useless-escape
export const expRegEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;