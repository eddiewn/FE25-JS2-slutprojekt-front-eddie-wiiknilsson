
const addAssignment = async (e: Event) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const title = formData.get("title")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    console.log(title, description, category);

    try {
        const URL = "http://localhost:3000/addAssignment"
        const response = await fetch(URL,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                category: category
            }),
        });

        if(!response.ok) throw new Error(`Fel någonstans att skicka assignment, ${response.status}`)

        const result = await response.json()
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}

const form = document.querySelector<HTMLFormElement>(".add-assignment-form")
if (form) {
    form.addEventListener("submit", addAssignment)
}