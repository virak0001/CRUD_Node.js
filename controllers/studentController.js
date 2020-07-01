const express = require('express');
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

// show form create student
exports.create = function(req,res) {
    res.render("student/addOrEdit", {
        viewTitle: "Insert Student"
    });
};

// store data of student
exports.store = function(req,res) {
    insertdata(req,res);
};

function insertdata(req,res){
    var student = new Student();
    student.name = req.body.name;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    student.save((err,doc)=>{
        if(!err){
            res.redirect('/');
        }else {
            if (err.name || err.email || err.mobile || city.city == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/addOrEdit", {
                    viewTitle: "Insert Employee",
                    student: req.body
                });
            } else {
                console.log('Error during record insertion : ' + err);
            }
        }
    })
}



exports.update = function(req,res){
Student.findOneAndUpdate({_id:req.body._id}, req.body, {runValidators: true}, (err, Student) => {
        if(!err){
            res.redirect('/');
        }else {
            if (err.name || err.email || err.mobile || city.city == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("student/edit", {
                    viewTitle: "Update Employee",
                    student: req.body
                });
            } else {
                console.log('Error during record insertion : ' + err);
            }
        }
    });
}

exports.delete = function(req,res){
    Student.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else { console.log('Error in student delete :' + err); }
    });
}
exports.index = function(req,res) {
    Student.find((err, docs) => {
        if (!err) {
            res.render("student/studentList", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
};

exports.edit = function(req,res){
    Student.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("student/edit", {
                viewTitle: "Update Employee",
                student: doc
            });
        }
    });
}
function handleValidationError(err, body){
    for(field in err.errors){
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            case 'city':
                body['cityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}