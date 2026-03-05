import { removeAssignment, getAssignments, patchAssignment } from "./api/assignmentsApi";
import { getMembers } from "./api/membersApi";
import type {Members, Assignments} from "./Types";


const createCards = async () => {
            const appendDoing = document.querySelector(".doing");
            const apendNew = document.querySelector(".new");
            const appendDone = document.querySelector(".done");

            if(appendDoing)appendDoing.innerHTML = '';
            if(apendNew)apendNew.innerHTML = '';
            if(appendDone)appendDone.innerHTML = '';


    

    const assignments = await getAssignments();
    const members = await getMembers();

    console.log(assignments);
    console.log(members)

    assignments.forEach((assignment: Assignments) => {
        const box = document.createElement("div");
        const title = document.createElement("h2");
        title.textContent = assignment.title;

        const description = document.createElement("p");
        description.textContent = assignment.description;
        description.className = "text-xs";

        const category = document.createElement("p");
        category.textContent = assignment.category;
        category.className = "text-xs";

        const bottomLayer = document.createElement("div");
        bottomLayer.className = "flex gap-2";

        const timestamp = document.createElement("p");
        timestamp.textContent = assignment.timestamp;
        timestamp.className = "text-xs";

         bottomLayer.appendChild(timestamp)


        if (assignment.status === "new") {
            const form = document.createElement("form");
            const dropdown = document.createElement("select");

            const placeholderOption = document.createElement("option");
            placeholderOption.textContent = "Assign to: ";
            placeholderOption.value = "";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;

            dropdown.appendChild(placeholderOption);

            members?.forEach((member: Members) => {

                if(member.category !== assignment.category) return;

                const option = document.createElement("option")
                option.textContent = member.name;
                dropdown.appendChild(option)
            });

            const assignButton = document.createElement("button");
            assignButton.textContent = "Assign";
            assignButton.type = "submit";

            form.append(dropdown, assignButton)
            bottomLayer.append(form);



            apendNew?.append(box);
        }else if(assignment.status === "doing"){
            console.log(`This is in doing: ${assignment.title}`)

            const assignedTo = document.createElement("p");
            assignedTo.textContent = `Assigned to: ${assignment.assignedto}`

            const doneButton = document.createElement("button")
            doneButton.textContent = 'Mark "done"' 
            doneButton.addEventListener("click", async() => {
                assignment.status = "done";
                await patchAssignment(assignment)
                createCards();
            })   

            box.append(assignedTo)

            bottomLayer.appendChild(doneButton)

            appendDoing?.append(box)

        }else if(assignment.status === "done"){
            console.log(`This is in done: ${assignment.title}`)

            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.className = "bg-red-600 border rounded"

            removeButton.addEventListener("click", async() => {
                await removeAssignment(assignment.id)
                createCards();
            })

            bottomLayer.appendChild(removeButton);

            appendDone?.append(box)
        }

        box.append(title, description, category, bottomLayer);

    });
};

createCards();
