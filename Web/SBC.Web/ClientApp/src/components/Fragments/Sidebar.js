﻿import React from 'react';
import { NavLink, } from 'react-router-dom';

import { userService } from '../../services';

import styles from "./Sidebar.module.css";

export default function Sidebar(props) {
    return (

        <div className={styles.container}>
            <button className={styles.pencilLink} onClick={() => props.showModal()}>
                <img src="/assets/images/iconmonstr-pencil-2.svg" className={styles.pencil} alt="" />
            </button>
            <div className={styles.namesContainer}>
                <div className={styles.greenCircle}>
                    {props.userData['fullname'] ? props.userData.fullname[0] : "N/A"}
                </div>
                <div className={styles.names}>
                    <div className={styles.fullName}>
                        {props.userData ? props.userData.fullname : "N/A"}
                    </div>
                    <div className={styles.companyName}>
                        {!props.userData['companyName'] ? null : props.userData.companyName}
                    </div>
                </div>
            </div>
            <div className={styles.navigation}>

                {props.userRole == "Administrator"
                    ? _adminUrl
                    : props.userRole == "Owner"
                        ? _ownerUrls
                        : props.userRole == "Employee" ? _employeeUrl : null}

            </div>
        </div>
    );
}
const onLogout = () => {
    userService.logout();
}
const _ownerUrls = (
    <ul>
        <li><NavLink to="owner/dashboard" className={({ isActive }) => (isActive ? styles.active : styles.notActive)}>Dashboard</NavLink></li>
        <li><NavLink to="owner/courses" className={({ isActive }) => (isActive ? styles.active : styles.notActive)}>Active Courses</NavLink></li>
        <li><NavLink to="owner/coaches" className={({ isActive }) => (isActive ? styles.active : styles.notActive)}>Active Coaches</NavLink></li>
        <li><NavLink to='owner/employees' className={({ isActive }) => (isActive ? styles.active : styles.notActive)}>Employees</NavLink></li>
        <li><NavLink to="owner/invoice" className={({ isActive }) => (isActive ? styles.active : styles.notActive)}>Invoice</NavLink></li>
        <li><NavLink to="" className={styles.logout} onClick={onLogout} >Log Out</NavLink></li>
    </ul>
);


const _adminUrl = (
    <ul>
        <li> <NavLink to="admin/dashboard">Dashboard</NavLink></li>
        <li> <NavLink to="admin/clients">Clients</NavLink></li>
        <li> <NavLink to="admin/revenue">Revenue</NavLink></li>
        <li><NavLink to="" className={styles.logout} onClick={onLogout} >Log Out</NavLink></li>
    </ul>
);

const _employeeUrl = (
    <ul>
        <li> <NavLink to="employee/dashboard">Dashboard</NavLink></li>
        <li> <NavLink to="employee/courses">Courses</NavLink></li>
        <li> <NavLink to="employee/coaches">Coaches</NavLink></li>
        <li> <NavLink to="employee/achievements">Achievements</NavLink></li>
        <li><NavLink to="" className={styles.logout} onClick={onLogout} >Log Out</NavLink></li>
    </ul>
);