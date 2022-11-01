import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Divide } from 'hamburger-react';
import { navLink } from 'src/types/navLinks/navLinks';
import { navLinks } from 'src/utils';

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
            <nav>
              {navLinks.map((link: navLink): JSX.Element | null => {
                let { name, path } = link;
                if (name === 'logIn' || name === 'logOut') return null;
                return (
                  <Link key={name} to={path}>{name}</Link>
                )
              })}
            </nav>
          </article>
          <article className={`navContainer ${this.state.responsiveNav ? 'showNav' : 'hidenNav'}`}>
            <nav>
              {navLinks.map((link: navLink): JSX.Element | null => {
                let { name, path } = link;
                if (name === 'logIn' || name === 'logOut') return (<Link key={name} to={path}>{name}</Link>);
                return null;
              })}
            </nav>
          </article>
          <Outlet />
        </section>
      </header>
    );
  }
}

export default Header