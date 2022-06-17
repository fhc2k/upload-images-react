import { useState } from "react"

export const useClipboard = (initialValue) => {
    const [ state, setState ] = useState(initialValue);

    const setCopy = text => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setState("copied");
                setTimeout(() => setState(initialValue), 2000);
            });
    }

    return [ state, setCopy ];
}