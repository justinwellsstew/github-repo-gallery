// const and variables
const username = "justinwellsstew";
const api = "https://api.github.com"
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

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
    let data = await fetch(`${api}/users/${username}/repos?sort=updated&per_page=100`);
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

repoList.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        let repo = e.target.innerText;
        console.log(repo);
    individualRepoData(repo);

    }
})

const individualRepoData = async function(repoName){
    let data = await fetch(`${api}/repos/${username}/${repoName}`);
    let indiviualRepoRecord = await data.json();
    const fetchLanguages = await fetch(indiviualRepoRecord.languages_url);
    const languageData = await fetchLanguages.json();
    let languagesArray = [];
    for (let language in languageData){
        languagesArray.push(language);
    }
    console.log(indiviualRepoRecord);
    console.log("Lang" +languagesArray);

    displayToPageRepoData(indiviualRepoRecord, languagesArray);

}

const displayToPageRepoData = function(repoInfo, languages){
    repoData.innerHTML = "";
    const dataContainer = document.createElement("div");
    dataContainer.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.classList.remove("hide");
    repos.classList.add("hide");    
    repoData.append(dataContainer);    
}

