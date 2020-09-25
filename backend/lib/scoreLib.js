module.exports.interviewbitScore = async function (score, callback) {
    try {
        var calculated_score = score / 3;
        callback(null,{
            score: score
        })

    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}