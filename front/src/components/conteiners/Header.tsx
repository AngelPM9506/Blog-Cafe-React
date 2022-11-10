import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Divide } from 'hamburger-react';
import { navLink } from 'src/types/navLinks/navLinks';
import { navLinks } from 'src/utils';
import GenarlNav from '../modules/GenarlNav';

type MyState = { [x: string]: any }

class Header extends Component {

  state: MyState = {
    responsiveNav: false
  }

  changeNavSatet = () => {
    let { responsiveNav } = this.state;
    this.setState({ responsiveNav: responsiveNav ? false : true });
    console.log(this.state.responsiveNav);
  }
  centralNav: navLink[] = navLinks
    .filter((link: navLink) => link.name !== 'logIn')
    .filter((link: navLink) => link.name !== 'logOut');

  lastNav: navLink[] = navLinks
    .filter((link: navLink) => (link.name === 'logIn' || link.name === 'logOut'));

  render(): ReactNode {
    return (
      <header>
        <section className='headerContainer'>
          <article className="logo">
            <Link to={'/'}>
              <h4>Mtr. Miguel A.P.M.</h4>
            </Link>
            <div className={`movileButton`}>
              <Divide onToggle={this.changeNavSatet} />
            </div>
          </article>
          <article className={`navContainer ${this.state.responsiveNav ? 'showNav' : 'hidenNav'}`}>
            <GenarlNav links={this.centralNav} />
          </article>
          <article className={`navContainer ${this.state.responsiveNav ? 'showNav' : 'hidenNav'}`}>
            <GenarlNav links={this.lastNav} />
          </article>
          <Outlet />
        </section>
      </header>
    );
  }
}

export default Header