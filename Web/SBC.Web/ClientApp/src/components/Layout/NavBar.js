import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from "./NavBar.module.css";

const NavBar = () => {

    return (
        <header>
            <div className={styles.headerContainer}>
                < div className={styles.logoContainer}>
                    <img src="assets/images/Group 5.svg" className={styles.arrow} alt="" />
                    < div className={styles.upskillContainer}>
                        <NavLink to="/" className={styles.upskillLink}>upskill</NavLink>
                    </div>
                </div>
                < div className={styles.testedLinks}>
                    <ul>
                        <li>
                            <NavLink tag={Link} to="/loginasemployee">Login as Employee</NavLink>
                        </li>
                        <li>
                            <NavLink tag={Link} to="/registerAsOwner">Register</NavLink>
                        </li>
                        <li>
                            <a href="/docs">Docs</a>
                        </li>
                    </ul>
                </div>
                < div className={styles.homePageButtons}>
                    <ul>
                        <li>
                            <Link to="/login" ><button className={styles.loginButton}>Login</button></Link>
                        </li>
                        <li>
                            <Link to="/request-a-demo" ><button className={styles.requestDemoBtn}>Request a Demo</button></Link>
                        </li>
                    </ul>
                </div>
                < div className={styles.coursesCoaches}>
                    <ul>
                        <li>
                            <NavLink
                                to="/courses"
                                className={({ isActive }) => (isActive ? styles.coursesActive : styles.coursesNotActive)}
                            >
                                Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/coaches"
                                className={({ isActive }) => (isActive ? styles.coursesActive : styles.coursesNotActive)}
                            >
                                Coaches
                            </NavLink>
                        </li>
                    </ul>
                </div>
                < div className={styles.greenCircle}>
                    <p>A</p>
                </div>
            </div>
        </header>
    )
}

export default NavBar;