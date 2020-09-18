const request = require("request-promise");
const cheerio = require("cheerio");
const submissionData = require('../files/submissions.json');
const Submission = require('../models/submissionModel');
const PlagirismData = require("../models/contestPlagiarismDataModel");
const Contest = require('../models/contest');
var fs = require('fs');



exports.getContestDetail = async function (req, res) {

    try {

        var new_contest = new Contest(req.body);
        new_contest=await new_contest.save();
        console.log(new_contest);

        res.status(200).send({
            msg: "contest Saved"
        })
    } catch {
        console.log(error);
        res.status(500).send({
            error
        });
    }
}