﻿import React from 'react';

import styles from './ManagerCoachCard.module.css';

export default function ManagerCoachCard(props) {
    return (
        <div className={styles.card}>
            <div className={styles.upper}>
                <img className={styles.cardpic} src="/assets/images/Mask Group 3.png" alt="" />
            </div>
            <div className={styles.down}>
                <div className={styles.name}>
                    <span>Category?</span>
                    <span>{props.coach.fullName}</span>
                </div>
                <div className={styles.price}>
                    <span>{props.coach.pricePerSession}&#8364; per session</span>
                    <span className={styles.imgContainer}><img src={props.coach.companyLogoUrl} /></span>
                </div>
                <div className={styles.button}>
                    {props.coach.isActive
                        ? <button className={styles.removeButton}>Remove</button>
                        : <button className={styles.removeButton}>Add</button>
                    }
                </div>
            </div>
        </div>
    )
}