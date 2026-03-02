import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function useApi({ isLoadingInitialValue = false } = {}) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(isLoadingInitialValue);

    async function request({
        url,
        method = "GET",
        headers,
        body,
        onSuccess = () => {},
        onError = () => {},
    }) {
        setData(null);
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API_URL}${url}`, {
                method,
                body,
                headers,
            });

            const resBody = await res.json();

            if (!res.ok) {
                if (resBody.errors) {
                    const errorsString = resBody.errors
                        .map((e) => e.msg)
                        .join("\n");
                    
                    setError(errorsString);
                    onError(errorsString, res.status);
                } else {
                    setError(resBody.error);
                    onError(resBody.error);
                }

                return;
            }

            setData(resBody);
            onSuccess(resBody);
        } catch (e) {
            console.error(e);
            setError("Network error, Please try again");
            onError("Network error, Please try again");
        } finally {
            setIsLoading(false);
        }
    }

    return { data, error, isLoading, request };
}
