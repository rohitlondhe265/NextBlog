"use client";

import Link from "next/link";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)
  const session = useSession();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Next Blog
      </Link>
      <div className={click ? `${styles.navMenu} ${styles.navMenuActive}` : styles.navMenu}>
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className={styles.link}>
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button className={styles.logout} onClick={signOut}>
            Logout
          </button>
        )}
      </div>
      <div className={styles.hamburger} onClick={handleClick}>
        {click ? (<img className={styles.icon} src="/git.png"></img>) : (<img className={styles.icon} src="/linked.jpg"></img>)}
      </div>
    </div>
  );
};
{/* <div className='navbar'>
  <div className='container'>
    <h1><span><BsFillHouseFill />Real</span>Estate</h1>
    <button className='btn'>Sign In</button>
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      <li><a href='#'>Home</a></li>
      <li><a href='#'>Search</a></li>
      <li><a href='#'>About</a></li>
      <li><a href='#'>Contact</a></li>
    </ul>
    <div className='hamburger' onClick={handleClick}>
      {click ? (<FaRegTimesCircle className='icon' />) : (<HiOutlineMenuAlt4 className='icon' />)}
    </div>
  </div>
</div> */}
export default Navbar;
