module.exports.interviewbitScore = async function (score,handle, callback) {
    try {
        let calculated_score = score / 3;
        calculated_score=Math.round(calculated_score*100)/100;

        callback(null,{
            score: calculated_score,
            handle
        })

    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}

module.exports.leetcodeScore = async function (solvedCount,handle, callback) {
    try {
        let calculated_score =solvedCount*10;
        calculated_score=Math.round(calculated_score*100)/100;
        callback(null,{
            score: calculated_score,
            handle
        })

    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}


module.exports.codechefScore = async function (solvedCount,rating,handle, callback) {
    try {
        let calculated_score =solvedCount*10;
        // console.log(calculated_score);

        let rating_score= (rating-1300);
        // console.log(rating_score);

        rating_score=(rating_score*rating_score)/30;
        // console.log(rating_score);

        let total_score=calculated_score+rating_score;

        total_score=Math.round(total_score*100)/100;
        callback(null,{
            score: total_score,
            handle
        })

    } catch (error) {
        console.log(error);
        callback(error, null);
    }
}