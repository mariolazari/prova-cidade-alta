import {Fragment} from "react";
import styles from "./social.module.css"
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

type Props = {
    onClickInstagram: () => void
    onClickLinkdIn: () => void
    onClickEmail: () => void
}

const Social = ({onClickInstagram, onClickLinkdIn, onClickEmail}: Props) => {
    return (
        <Fragment>
            <div className={styles.containerSocial}>
                <div className={styles.socialInstagram} onClick={onClickInstagram}>
                    <InstagramIcon/>
                    <div className={styles.textSocial}>
                        Instagram
                    </div>
                </div>
                <div className={styles.socialLinkdIn} onClick={onClickLinkdIn}>
                    <LinkedInIcon/>
                    <div className={styles.textSocial}>
                        LinkdIn
                    </div>
                </div>
                <div className={styles.socialEmail} onClick={onClickEmail}>
                    <EmailIcon/>
                    <div className={styles.textSocial}>
                        Email
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Social