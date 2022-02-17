import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import css from './NavigationBar.module.css';

import { GetAdminData } from './../../services/super-admin-service';

export default function NavigationBar(props) {
    const onLogout = () => {
        //clear jwt token and redirect to main page 
        console.log("Logout")
    }

    let [txt, settxt] = useState();

    let [admin, setAdmin] = useState({});

    useEffect(async () => {
        await GetAdminData().then(a => {
            setAdmin(a)
            settxt(a.fullname.substring(0,1))
        })
    }, [])

    return (
        <div className={css.vertical}>
            <div className={css.iconPen}>
                <Link to="" onClick={() => props.showModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25">
                        <path id="iconmonstr-pencil-2" d="M19.075,2.946l2.981,2.98L6.4,21.585l-3.732.752L3.417,18.6,19.075,2.946Zm0-2.946L1.5,17.576,0,25l7.424-1.5L25,5.926,19.075,0Z" />
                    </svg>
                </Link>
            </div>
            <div className={css.circleContainer}>
                <div className={css.circleFloatChild}>
                    <span className={css.nameVisualizer}> {txt} </span>
                </div>
                <div className={css.floatChild2}>
                    <label className={css.lable}>{admin.fullname}</label>
                    <label className={css.lableColored}>{!admin.company ? "--- No Company ---" : admin.company}</label>
                </div>
                <br />
            </div>
            <div className={css.Navigation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="359" height="1" viewBox="0 0 359 1">
                    <line id="Line_28" data-name="Line 28" x2="358" transform="translate(0.5 0.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1" />
                </svg>

                <NavLink to="/super-admin/dashboard">Dashboard</NavLink>
                <svg xmlns="http://www.w3.org/2000/svg" width="359" height="1" viewBox="0 0 359 1">
                    <line id="Line_28" data-name="Line 28" x2="358" transform="translate(0.5 0.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1" />
                </svg>

                <NavLink to="/super-admin/clients">Clients</NavLink>
                {/* <a href="/super-admin/clients">Clients</a> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="359" height="1" viewBox="0 0 359 1">
                    <line id="Line_28" data-name="Line 28" x2="358" transform="translate(0.5 0.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1" />
                </svg>

                <NavLink to="/super-admin/revenue">Revenue</NavLink>
                <svg xmlns="http://www.w3.org/2000/svg" width="359" height="1" viewBox="0 0 359 1">
                    <line id="Line_28" data-name="Line 28" x2="358" transform="translate(0.5 0.5)" fill="none" stroke="#000" strokeLinecap="round" strokeWidth="1" />
                </svg>

                <a href="#" onClick={onLogout} className={css.logOut}>Log Out</a>
            </div>
        </div>
    )
}
