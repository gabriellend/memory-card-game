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
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=15&has_breeds=1", requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        const result = await response.json();
        const transformed = result.map(cat => ({
            name: cat.breeds[0].name,
            id: cat.id,
            url: cat.url,
        }))

        const uniqueNames = new Set();
        const uniqueCats = transformed.filter(cat => {
            if (!uniqueNames.has(cat.name.toLowerCase())) {
                uniqueNames.add(cat.name.toLowerCase());
                return true;
            }
            return false;
        });

        // console.log("Unique Cats: ", JSON.stringify(uniqueCats, null, 2));
        return uniqueCats;
    } catch(error) {
        console.log({error})
        return [];
    }
}