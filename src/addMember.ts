const addMember = async(e: Event) => {

    console.log("I am now running add member")

    e.preventDefault();
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

const form = document.querySelector<HTMLFormElement>(".add-member-form");
if(form){
    form.addEventListener("submit", addMember)
}