import {getAssignments} from "./GetAssignments";
import { getMembers } from "./getMembers";
import type {Members, Assignments} from "./Types";


const createCards = async () => {
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

        const bottomLayer = document.createElement("form");
        bottomLayer.className = "flex gap-2";

        const timestamp = document.createElement("p");
        timestamp.textContent = assignment.timestamp;
        timestamp.className = "text-xs";

        if (assignment.status === "new") {
            const dropdown = document.createElement("select");

            const placeholderOption = document.createElement("option");
            placeholderOption.textContent = "Assign to: ";
            placeholderOption.value = "";
            placeholderOption.disabled = true;
            placeholderOption.selected = true;

            dropdown.appendChild(placeholderOption);

            members?.forEach((member: Members) => {
                const option = document.createElement("option")
                option.textContent = member.name;
                dropdown.appendChild(option)
            });

            const assignButton = document.createElement("button");
            assignButton.textContent = "Assign";
            assignButton.type = "submit";

            bottomLayer.append(timestamp, dropdown, assignButton);

            box.append(title, description, category, bottomLayer);

            const apendNew = document.querySelector(".new");

            apendNew?.append(box);
        }else if(assignment.status === "doing"){
            console.log(`This is in doing: ${assignment.title}`)

            box.append(title)

            const appendDoing = document.querySelector(".doing");
            appendDoing?.append(box)
            

        }else if(assignment.status === "done"){
            console.log(`This is in done: ${assignment.title}`)

            box.append(title)

            const appendDoing = document.querySelector(".done");
            appendDoing?.append(box)
        }
    });
};

createCards();
