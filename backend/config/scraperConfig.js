module.exports = {
    common: {
        agent : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36",
        maximum_fetch_window_in_minutes : 240,
        min_crawling_delay : 4000,
        max_crawling_delay : 10000
    },
    vjudge:{
        cookie : "JSESSIONID=XXXXXXX;",
        vj_contest_details_url: 'https://vjudge.net/contest/rank/single/${contest_id}',
        vj_judge_submissions_url : "https://vjudge.net/status/data/?start=${offset}&length=${limit}&un=&num=-&res=${res}&language=&inContest=${in_contest}&contestId=${contest_id}",
        vj_submission_id_to_code_url: 'https://vjudge.net/solution/data/${site_submission_id}'
    },
    hackerrank : {
        cookie : "_hrank_session=XXXXX;",
        hr_submission_id_to_code_url : "https://www.hackerrank.com/rest/contests/${contest_name}/submissions/${site_submission_id}",
        hr_judge_submissions_url : "https://www.hackerrank.com/rest/contests/${contest_name}/judge_submissions?offset=${offset}&limit=${limit}",
        hr_leaderboard_crawling_min_delay_milliseconds: 5000,
        hr_leaderboard_crawling_max_delay_milliseconds: 10000
    },
    interviewbit : {
        ib_selectors :{
          username_selector : "body > div.container.user-profile > div.col-xs-12.col-md-4 > div.user-info > div > div",
          rank_selector : "body > div.container.user-profile > div.col-xs-12.col-md-4 > div.user-stats > div.stat.rank.pull-left > div.txt",
          score_selector : "body > div.container.user-profile > div.col-xs-12.col-md-4 > div.user-stats > div:nth-child(2) > div.txt"
        },
        ib_user_profile_url : "https://www.interviewbit.com/profile/${interviewbit_username}",
        ib_cookie : "_ib_session=XXXXX"
      },
};
