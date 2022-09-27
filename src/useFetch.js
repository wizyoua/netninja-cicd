import { useEffect, useState } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    //we can use useEffect to run code when a component is rendered like making a fetch request
    useEffect(() => {
        //using AbortController to abort fetch request when component using this hook is unmounted
        const abortCont = new AbortController();


        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource');
                    }
                    return res.json();
                })
                .then(data => {
                    setData(data);
                    setIsPending(false);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted');
                    } else {
                        setIsPending(false);
                        setError(err.message);
                    }
                });
        }, 1000);

        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;