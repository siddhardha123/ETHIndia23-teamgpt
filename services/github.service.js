const getGitHubUserInfo = async (username) => {
    const apiUrl = `https://api.github.com/users/${username}`;

    try {
        const response = await fetch(apiUrl);
        if (response.ok) {
            const { public_repos, followers } = await response.json();
            return { username : {public_repos,followers} }
        } else {
            console.error(`Error: ${response.status} - ${response.statusText}`);
            return null;
        }
    } catch (error) {
        console.error("An error occurred while fetching data:", error);
        return null;
    }
};

const getGitHubUsersInfo = async (usernames) => {
    try {
        const userPromises = usernames.map(username => getGitHubUserInfo(username));
        const userInfos = await Promise.all(userPromises);
        return userInfos;
    } catch (error) {
        console.error("An error occurred while fetching user data:", error);
        return null;
    }
};


module.exports ={
    getGitHubUsersInfo,
}
