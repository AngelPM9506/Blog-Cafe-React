import React from 'react'
import { Link } from 'react-router-dom';
import { navLink } from 'src/types/navLinks/navLinks';
import { PropsGenNav } from 'src/types/props';

export default function GenarlNav(props: PropsGenNav) {
  const { links, responsive } = props;
  const changeStateResp = () => responsive();
  return (
    <nav>
      {links.map((link: navLink): JSX.Element | null => {
        let { name, path } = link;
        return (
          <Link key={name} to={path} onClick={changeStateResp}>{name}</Link>
        );
      })}
    </nav>
  )
}
