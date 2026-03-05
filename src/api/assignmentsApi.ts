
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

export const removeAssignment = async(id: string) => {
    try {
        const URL = "http://localhost:3000/deleteAssignment"

        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
        })
        })

        const result = await response.json();
        console.log(result)
        
    } catch (error) {
        console.log(error)
    }
}
