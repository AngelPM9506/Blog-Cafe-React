import React from 'react'
import { Link } from 'react-router-dom';
import { navLink } from 'src/types/navLinks/navLinks';
import { PropsGenNav } from 'src/types/props';

export default function GenarlNav(props: PropsGenNav) {
  const { links } = props;
  return (
    <nav>
      {links.map((link: navLink): JSX.Element | null => {
        let { name, path } = link;
        return (
          <Link key={name} to={path}>{name}</Link>
        );
      })}
    </nav>
  )
}
