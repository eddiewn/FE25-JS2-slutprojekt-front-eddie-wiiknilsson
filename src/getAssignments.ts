    
export const getAssignments = async() => {
    try {
        const URL = "http://localhost:3000/getAssignments"
        const response = await fetch(URL);

        if(!response.ok) throw new Error(`Fel någonstans att skicka assignment, ${response.status}`)

        const result = await response.json()
        return result;
    } catch (error) {
        console.log(error)
    }
}
