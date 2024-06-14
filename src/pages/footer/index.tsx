import React, {Fragment} from "react";
import styles from "./footer.module.css";
import CopyrightIcon from '@mui/icons-material/Copyright';

const Footer = () => {
    return (
        <Fragment>
            <div className={styles.containerCopyright}>
                <div className={styles.copyright}>
                    <CopyrightIcon className={styles.icon}/>
                    <div className={styles.textCopyright}>
                        Mario Lazari
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer