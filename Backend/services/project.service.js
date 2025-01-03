import projectModel from "../models/project.model.js";


export const createProject = async ({
    name, userId
}) => {
    if(!name) {
        throw new Error('Name is required');
    }

    if(!userId) {
        throw new Error('User ID is required');
    }

    let project;
    try{
        project = await projectModel.create({
            name,
            users: [userId]
        });
    } catch(err) {
        console.log(err);
        throw new Error('Project name already exists');
    }

    return project;
};
