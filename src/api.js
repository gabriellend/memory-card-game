const headers = new Headers({
  "Content-Type": "application/json",
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
        console.log("Transformed: ", JSON.stringify(transformed, null, 2));
        return transformed;
    } catch(error) {
        console.log({error})
        return [];
    }
}