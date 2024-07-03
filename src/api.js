const headers = new Headers({
  "Content-Type": "application/json",
  "x-api-key": import.meta.env.VITE_API_KEY
});

var requestOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow'
};

export const getCats = async() => {
    try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        const result = await response.json();

        const uniqueIds = new Set();
        const uniqueCats = result.filter(cat => {
            if (uniqueIds.size >= 15) return false;

            if (!uniqueIds.has(cat.id)) {
                uniqueIds.add(cat.id);
                return true;
            }

            return false;
        });

        const transformed = uniqueCats.map(cat => ({
            name: cat.breeds[0].name,
            id: cat.id,
            url: cat.url,
        }))

        // console.log("Unique Cats: ", JSON.stringify(transformed, null, 2));
        return transformed;
    } catch(error) {
        console.log({error})
        return [];
    }
}