// const and variables
const username = "justinwellsstew";
const overview = document.querySelector(".overview");


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