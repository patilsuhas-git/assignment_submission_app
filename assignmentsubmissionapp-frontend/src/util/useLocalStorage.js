import {useEffect, useState} from "react";

function useLocalState(defaultValue, key) {
    const [value, setValue] = useState(() => {
        const stickValue = window.localStorage.getItem(key);
        return stickValue !== null ? JSON.parse(stickValue) : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}


export {useLocalState}
