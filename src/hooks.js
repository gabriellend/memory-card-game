import { useEffect, useState } from "react";
import { getCats } from "./api";

export const useCats = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCats = async() => {
            try {
                const catData = await getCats();
                setCats(catData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCats()
    }, []);

    return {cats, loading, error};
}