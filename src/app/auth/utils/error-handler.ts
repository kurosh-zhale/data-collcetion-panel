export function authErrorHandler(firebaseError: string):string {
    if (firebaseError.includes('email-already-exists'))
        return 'Email Already Exists!';

    else if (firebaseError.includes('invalid-password'))
        return 'Password is Invalid!';

    else if (firebaseError.includes('invalid-email'))
        return 'Invalid Email!';

    else if (firebaseError.includes('phone-number-already-exists'))
        return 'Phone Number Already Exists!';

    else if (firebaseError.includes('too-many-requests'))
        return 'Too Many Requests!';

    else if(firebaseError.includes('user-not-found'))
        return 'User Not Found!';

    else if(firebaseError.includes('internal-error'))
        return 'Internal Error!';

    else 
        return 'Unknown Error!'
}
