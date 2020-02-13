import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getThemeOfLocalStorage(key: string, initialState: any) {
    const storageValue = localStorage.getItem(key);

    if(storageValue) {
        return JSON.parse(storageValue);
    }

    return initialState;
}

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>
];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
    const [state, setState] = useState(() => getThemeOfLocalStorage(key, initialState));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default usePersistedState;
