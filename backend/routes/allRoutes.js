const express = require('express');
const app = express.Router();
const ScrapMossLib = require('../lib/scrapMoss');
const ReadSubmissionLib =require('../lib/readSubmission');
const ResultLib  = require('../lib/result');
const ContestLib = require('../lib/contestLib');
const LeaderboardLib =require('../lib/leaderboard');
const ProfileLib = require('../lib/profileLib');
var json2xls = require('json2xls');
var verify =require('../verifytoken');


//data scraping routes
app.post('/scrap/data',verify, ScrapMossLib.ScrapContestPlagiarismData);
app.post('/update/plagiarism/data',ScrapMossLib.UpdatePlagiarismData);


//submission routes
app.get('/submission/data',ReadSubmissionLib.readSubmissionData);
app.post('/generate/file',verify,ReadSubmissionLib.generateFileForSubmission);
app.get('/unique/contest',verify,ReadSubmissionLib.uniqueContests);
app.get('/unique/contest/result',verify,ReadSubmissionLib.uniqueGeneratedContestReport);
app.post('/submission/user',ReadSubmissionLib.getAllSubmissionOfUser);//admin


//result routes
app.get('/submission/code/:id',ResultLib.submissionCode); //non admin
app.get('/exe',ResultLib.childProcess);
app.post('/plagiarism/result',ResultLib.contestResult);//non admin
app.post('/plagiarism/result/csv',ResultLib.contestResultCSV);//non admin
app.post('/exe/delete',ResultLib.deleteFiles);


//contest routes
app.post('/submission/contest',ContestLib.getContestDetail) //non admin


//leaderboard routes
app.post('/leaderboard/data',LeaderboardLib.getLeaderBoardData)//admin
app.post('/site/recent/user',LeaderboardLib.getUserDetailOfDifferentSites) // non admin

//profile routes
app.post('/profile/user',ProfileLib.getDayLevelReport) //non admin
app.get('/check',ProfileLib.getAllSubmission);


module.exports = app;