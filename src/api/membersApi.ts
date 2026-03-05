export const getMembers = async() => {
    try {
        const URL = "http://localhost:3000/getMembers"
        const response = await fetch(URL);

        if(!response.ok) throw new Error("Gick inte att hämta members");

        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error)
    }
}

