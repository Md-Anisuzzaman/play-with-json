const store = require('./app/store');
const { fetchPosts } = require("./features/post/postSlice");
const { relatedFetchPosts } = require("./features/relatedPost/relatedPostSlice");

let queryString;

store.subscribe(() => {
    const text = store.getState().post.posts.title;
    const sText = String(text);
    const titleWords = sText.split(" ");
    queryString = titleWords.map((word) => `title_like=${word}`).join("&");
    console.log("my name querystring-------------......>", queryString);
});

// disptach actions
(async function () {
    store.dispatch(fetchPosts());
    store.dispatch(relatedFetchPosts(queryString));
})();
