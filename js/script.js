// const and variables
const username = "justinwellsstew";
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");

////Get user bio info //////////////////////////////////
const getGitHubData = async function(){
    let data = await fetch(`https://api.github.com/users/${username}`);
    let githubRecords =  await data.json();
    console.log(githubRecords);
    displayFetchedData(githubRecords); 
}

const displayFetchedData = function(data){
    let userInfo = document.createElement("div");
    userInfo.className = "user-info";
    userInfo.innerHTML= `<figure> <img alt="user avatar" src=${data.avatar_url} /></figure><div>
<p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`
    overview.append(userInfo);
}

getGitHubData();

////Get user repo info //////////////////////////////////

const getRepoInfo = async function(){
    let data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    let gitHubRepoRecords = await data.json();
    console.log(gitHubRepoRecords);
    displayRepoData(gitHubRepoRecords);
}

const displayRepoData = function(repos){
    for(const repo of repos){
        let li = document.createElement("li");
        li.className = "repo";
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);                
    }
}

getRepoInfo();
