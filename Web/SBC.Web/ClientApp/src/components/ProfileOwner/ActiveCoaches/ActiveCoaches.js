import { useEffect, useState, useCallback } from 'react';
import { Link } from "react-router-dom";

import ManagerCoachCard from '../../Fragments/ManagerCoachCard';
import { OwnerService } from '../../../services';
import styles from "./ActiveCoaches.module.css";

export default function ActiveCoaches() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        OwnerService.CompanyGetActiveCoaches()
            .then(res => {
                setCoaches(res.data)                
            })
    });

    return (
        <div className={styles.container}>
            <div className={styles.buttonContainer}>
                <Link to="/coachCatalog" ><button className={styles.manageButton}>Manage</button></Link>
            </div>
            <div className={styles.cardscontainer}>
                {coaches.length > 0
                    ? coaches.map(x => <ManagerCoachCard key={x.id} coach={x} />)
                    : <h3>No coaches yet</h3>
                }
            </div>
        </div>
    );
}
