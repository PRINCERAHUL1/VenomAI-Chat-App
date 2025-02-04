import mongoose from "mongoose";
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


export const getAllProjectByUserId = async ( {userId} ) => {
    if(!userId) {
        throw new Error('User ID is required');
    }

    const alluserProjects = await projectModel.find({users: userId});

    return alluserProjects;
}

export const addUserToProject = async ({
    projectId, users, userId
}) => {
    if(!projectId) {
        throw new Error('Project ID is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Project ID is invalid');
    }

    if(!users) {
        throw new Error('Users are required');
    }

    if(!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid UserId(s_ in users array");
    }

    if(!userId) {
        throw new Error('User ID is required');
    }

    if(!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error('User ID is invalid');
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    if(!project) {
        throw new Error('user not belong to this project');
    }

    const UpdatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    });

    return UpdatedProject;

}

export const getProjectById = async ({projectId}) => {
    if(!projectId) {
        throw new Error('Project ID is required');
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Project ID is invalid');
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users');

    if(!project) {
        throw new Error('Project not found');
    }

    return project;
};