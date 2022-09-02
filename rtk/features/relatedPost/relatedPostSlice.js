const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");


const initialState = {
    loading: false,
    relatedPosts: [],
    error: ""
}

const relatedFetchPosts = createAsyncThunk("relatedPosts/relatedFetchPosts", async (queryString) => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?{queryString}`
    );
    const relatedPosts = await response.json();

    return relatedPosts;
});


const relatedPostSlice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(relatedFetchPosts.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(relatedFetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.relatedPosts = action.payload;
        });

        builder.addCase(relatedFetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.relatedPosts = [];
        });
    },
});

module.exports = relatedPostSlice.reducer;
module.exports.relatedFetchPosts = relatedFetchPosts;
