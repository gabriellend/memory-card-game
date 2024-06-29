import { useEffect, useState } from "react";
import { getCats } from "./api";

export const useCats = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCats = async() => {
            try {
                const catData = await getCats();
                setCats(catData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCats()
    }, []);

    return {cats, loading};
}