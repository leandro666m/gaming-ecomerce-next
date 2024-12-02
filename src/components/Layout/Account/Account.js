import { Button, Icon, Label } from "semantic-ui-react";
import { useRouter} from "next/router";
import { useAuth } from "@/hooks";
import styles from './Account.module.scss';
import classNames from "classnames";

const total = 10;

export function Account() {

    const { user } = useAuth();
    const router = useRouter();

    const goToLogin = () => router.push('/join/sign-in');
    const goToAccount = () => router.push('/account');
    const goToCart = () => {
        if (!user) goToLogin()
        else router.push('/cart')
    }

    return (
        <div className={styles.account}>
            <Button icon className={styles.cart} onClick={goToCart} >
                <Icon name='cart' />
                { total > 0 && <Label circular> {total} </Label> }
            </Button>

            <Button icon className={ classNames({ [styles.user]: user } ) } onClick={user ? goToAccount :goToLogin} >
                <Icon name='user outline' />
            </Button>

        </div>
    )
}
