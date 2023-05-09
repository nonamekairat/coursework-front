import {useEffect, useRef} from "react";



const useOutsideClick = (callback: () => void) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClick = (event: any) => {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);

    return ref;
};

export default useOutsideClick;