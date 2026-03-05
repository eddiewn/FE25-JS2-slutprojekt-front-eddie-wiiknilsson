const addMember = async(e: Event) => {

    console.log("I am now running add member")

    // e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get("name");
    const category = formData.get("category");

    console.log(name, category);

    const data = {
        name: name,
        category: category,
    }

    const URL = "http://localhost:3000/addMember"
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
    })

    if(!response.ok) throw new Error ("chungus fel i addMember")

    console.log(response)

    } catch (error) {
        console.log(error)
    }
}

const memberForm = document.querySelector<HTMLFormElement>(".add-member-form");
if(memberForm){
    memberForm.addEventListener("submit", addMember)
}


const addAssignment = async (e: Event) => {
    // e.preventDefault();

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

const assignmentForm = document.querySelector<HTMLFormElement>(".add-assignment-form")
if (assignmentForm) {
    assignmentForm.addEventListener("submit", addAssignment)
}

const assignForm = document.querySelector(".assignForm");