import { Alert as AlertBootstrap, Container } from 'react-bootstrap';
import { APIError } from '../api/APIError';

type AlertProps = {
    error: APIError
}


export const Alert: React.FC<AlertProps> = ({ error }) => {

    let msg;
    switch (error.code) {

        case 'ERR_NETWORK':
            msg = "You have problem with internet. Check your network connection!"
            break;

        case 'ERR_DEPRECATED':
            msg = "Deprecated! You are not allowed to see this content!"
            break;

        case 'ERR_FR_TOO_MANY_REDIRECTS':
        case 'ERR_BAD_OPTION_VALUE':
        case 'ERR_BAD_REQUEST':
        case 'ERR_NOT_SUPPORT':
        case 'ERR_INVALID_URL':
            msg = "Sorry, we have a problem. Our developers are already fixing it!"
            break;

        case 'ERR_BAD_RESPONSE':
        case 'ERR_CANCELED':
            msg = "Oops! Error! Try again a little later!" 
            break;
        
        default:
            msg = "Oops! Some error occurred!"
    }

    return <AlertBootstrap variant='danger' data-testid="alert">{msg}</AlertBootstrap> 
        
}