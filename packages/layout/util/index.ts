export const storageGet = (key: string): any => {
    let value: any = sessionStorage.getItem(key);
    try {
        value = JSON.parse(value)
    } catch (error) {
        // console.warn('sessionStorageGet', error)
    }
    return value;
}

export const storageSet = (key: string, value: any): any => {
    let _value = value;
    if (typeof value === 'object') {
        _value = JSON.stringify(value);
    }
    sessionStorage.setItem(key, _value);
}

export const storageRemove = (key: string) => {
    sessionStorage.removeItem(key);
}

export const storageClear = () => {
    sessionStorage.clear();
}

export const getBaseUrl = (path: string) => {
    return path.substring(0, path.substr(1).indexOf('/') + 1);
}
// console.log(getBaseUrl(window.location.pathname));
// console.log(getBaseUrl('/outline-web/'));

export const getPathUrl = (path: string) => {
    return path.substr(path.substr(1).indexOf('/') + 1);
}
// console.log(getPathUrl(window.location.pathname));
