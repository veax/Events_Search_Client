export const getCurrentPosition = () => {
    return new Promise((accept, reject) => {
        navigator.geolocation.getCurrentPosition(accept, reject );
    })
}
