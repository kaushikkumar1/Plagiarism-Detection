const express = require('express');
const app = express.Router();
const ScrapMossLib = require('../lib/scrapMoss');
const ReadSubmissionLib =require('../lib/readSubmission');
const ResultLib  = require('../lib/result');
const ContestLib = require('../lib/contestLib');
const LeaderboardLib =require('../lib/leaderboard');
const ProfileLib = require('../lib/profileLib');
const BatchLib = require('../lib/batchLib')
var json2xls = require('json2xls');
var verify =require('../verifytoken');


//data scraping routes
app.post('/scrap/data',verify, ScrapMossLib.ScrapContestPlagiarismData);
app.post('/update/plagiarism/data',verify,ScrapMossLib.UpdatePlagiarismData);


//submission routes
app.get('/submission/data',verify,ReadSubmissionLib.readSubmissionData);
app.post('/generate/file',verify,ReadSubmissionLib.generateFileForSubmission);
app.get('/unique/contest',verify,ReadSubmissionLib.uniqueContests);
app.get('/unique/contest/result',verify,ReadSubmissionLib.uniqueGeneratedContestReport);
app.post('/submission/user',ReadSubmissionLib.getAllSubmissionOfUser);//admin


//result routes
app.get('/submission/code/:id',verify,ResultLib.submissionCode); //non admin
app.get('/exe',verify,ResultLib.childProcess);
app.post('/plagiarism/result',verify,ResultLib.contestResult);//non admin
app.post('/plagiarism/result/csv',verify,ResultLib.contestResultCSV);//non admin
app.post('/exe/delete',verify,ResultLib.deleteFiles);


//contest routes
app.post('/submission/contest',verify,ContestLib.getContestDetail) //non admin
app.get('/contests/user',verify,ContestLib.getContestsOfUser);
app.post('/contests/problem/user',verify,ContestLib.getProblemsOfContest)


//leaderboard routes
app.post('/leaderboard/data',verify,LeaderboardLib.getLeaderBoardData)//admin
app.post('/site/recent/user',LeaderboardLib.getUserDetailOfDifferentSites) // non admin

//profile routes
app.post('/profile/user',ProfileLib.getDayLevelReport) //non admin
app.get('/check',verify,ProfileLib.getAllSubmission); 
app.post('/submission/user/day',ProfileLib.getAllSubmissionOfUserOfADay) //nom admin


//batch routes
app.get('/batch/unique',BatchLib.uniqueBatch);
app.post('/batch/data',BatchLib.getDataOfBatch);

module.exports = app;