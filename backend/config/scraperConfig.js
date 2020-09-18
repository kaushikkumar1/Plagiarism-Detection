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
    leetcode : {
        profile_url : "https://leetcode.com/${leetcode_username}",
        contest_leaderboard_url : "https://leetcode.com/contest/api/ranking/{leetcode_contest_name}/?pagination={page_number}&region={contest_region}",
        lc_selectors:{
            rating_xpath : "//*[@id='base_content']/div/div/div[1]/div[2]/ul/li[2]/span",
            rating_selector : "#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(2) > ul > li:nth-child(2) > span",
            contests_finished_selector: '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(2) > ul > li:nth-child(1) > span',
            contribution_points_selector: '#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(4) > ul > li:nth-child(1) > span',
            solved_question_selector : "#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(3) > ul > li:nth-child(1) > span",
            acceptance_rate_selector: "#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(3) > ul > li:nth-child(3) > span",
            global_ranking_selector: "#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(2) > ul > li:nth-child(3) > span",
            username_selector: "#base_content > div > div > div.col-sm-5.col-md-4 > div:nth-child(1) > div.panel-body > p"
        }
    },
    CODECHEF : {
        user_profile_url : "https://www.codechef.com/users/${site_user_handle}",
        cc_selectors :{
            username_selector: 'body > main > div > div > div > div > div > section.user-details > ul > li:nth-child(1) > span > span:nth-child(2)',
            rating_selector : "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-header.text-center > div.rating-number",
            fully_solved_selector : "body > main > div > div > div > div > div > section.rating-data-section.problems-solved > div > h5:nth-child(1)",
            global_rank_selector : "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-ranks > ul > li:nth-child(1) > a > strong",
            country_rank_selector : "body > main > div > div > div > aside > div.widget.pl0.pr0.widget-rating > div > div.rating-ranks > ul > li:nth-child(2) > a > strong",
            star_rating_selector:"body > main > div > div > div > div > div > section.user-details > ul > li:nth-child(1) > span > span.rating"
        }
    }
};
