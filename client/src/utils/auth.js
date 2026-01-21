import Cookies from "js-cookie";

export const isLoggedIn = () => {
    // თუ token არსებობს cookie-ში, მაშინ დალოგინებულია
    return !!Cookies.get("lt");
};