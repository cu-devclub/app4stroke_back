const mongoose = require('mongoose');
const User = mongoose.model('User');

import { Request, Response } from 'express';
import httpError from '../errorHandler/httpError/httpError';

export default {
    getUser: (req: Request, res: Response): void => {
        res.render("/addOrEdit", {
            viewTitle: "Insert User"
        });
    },
    postUser: (req: Request, res: Response): void => {
        if (req.body._id == '')
            insertRecord(req, res);
            else
            updateRecord(req, res);
    },
    getUserList: (req: Request, res: Response): void => {
        User.find((err: any, docs: any) => {
            if (!err) {
                res.render("/list", {
                    list: docs
                });
            }
            else {
                res.status(500).send(httpError(500, "Error in retrieving user list: " + err));
            }
        });
    },
    updateUser: (req: Request, res: Response): void => {
        User.findById(req.params.id, (err: any, doc: any) => {
            if (!err) {
                res.render("/addOrEdit", {
                    viewTitle: "Update User",
                    user: doc
                });
            }
        });
    },
    deleteUser: (req: Request, res: Response): void => {
        User.findByIdAndRemove(req.params.id, (err: any, doc: any) => {
            if (!err) {
                res.redirect('/list');
            }
            else {
                res.status(500).send(httpError(500, "Error in deleting user: " + err));
            }
        });
    }
};

function insertRecord(req: Request, res: Response) {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.mobile = req.body.mobile;
    user.save((err: any, doc: any) => {
        if (!err)
            res.redirect('/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/addOrEdit", {
                    viewTitle: "Insert User",
                    user: req.body
                });
            }
            else {
                res.status(500).send(httpError(500, "Error in inserting record: " + err));
            }
        }
    });
}

function updateRecord(req: Request, res: Response) {
    User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err: any, doc: any) => {
        if (!err) { res.redirect('/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("user/addOrEdit", {
                    viewTitle: 'Update User',
                    user: req.body
                });
            }
            else {
                res.status(500).send(httpError(500, "Error in updating record: " + err));
            }
        }
    });
}

function handleValidationError(err: any, body: { [x: string]: any; }) {
    for (const field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
