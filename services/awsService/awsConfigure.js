const awsConfigure = {
    Auth: {
        region: "us-east-2",
        userPoolId: "us-east-2_d7fxx4gYe",
        userPoolWebClientId: "32bkoo4oc71it2m5vqjedmi94j",
        mandatorySignIn: true,
        cookieStorage: {
            // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            // This should be the subdomain in production as the cookie should only
            // be present for the current site
            domain: process.env.AUTH_COOKIE_DOMAIN,
            // OPTIONAL - Cookie path
            path: "/",
            // OPTIONAL - Cookie expiration in days
            expires: 7,
            // OPTIONAL - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            // The cookie can be secure in production
            secure: false,
        },

    }
}

export const authConfigure = {
    oauth: {
        domain: process.env.IDP_DOMAIN,
        scope: ["email", "openid"],
        // we need the /autologin step in between to set the cookies properly,
        // we don't need that when signing out though
        redirectSignIn: process.env.REDIRECT_SIGN_IN,
        redirectSignOut: process.env.REDIRECT_SIGN_OUT,
        responseType: "token",
    },
}

export default awsConfigure;

