const url = 'http://hn.algolia.com/api/v1/search_by_date?tags=story';

export const getStories = () => {
    return fetch(url)
        .then(resp => resp.json())
        .catch(error => {
            console.log(error);
            return { success: false }
        });
};