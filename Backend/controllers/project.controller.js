import projectModel from "../models/project.model.js";
import * as projectService from "../services/project.service.js";
import userModel from "../models/user.model.js";
import { validationResult } from 'express-validator';


export const createProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {name} = req.body;
    const loggenInUser = await userModel.findOne({email: req.user.email});

    const userId = loggenInUser._id;

    const newProject = await projectService.createProject({name, userId});

    res.status(201).json(newProject);
    }catch(err) {
        console.log(err);
        res.status(400).json({message: err.message});
    };

};

export const getAllProjects = async (req, res) => {
    try{
        const loggenInUser = await userModel.findOne({email: req.user.email});

        const allUserProjects = await projectService.getAllProjectByUserId({userId: loggenInUser._id});

        res.status(200).json(allUserProjects);

    }catch(err) {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {projectId, users} = req.body;

        const loggenInUser = await userModel.findOne({email: req.user.email});

        const project = await projectService.addUserToProject({
            projectId, 
            users, 
            userId : loggenInUser._id
        });

        res.status(200).json(project);
    }catch(err) {
        console.log(err);
        res.status(400).json({message: err.message});
    }
}