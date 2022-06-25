const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// getUser("florinpop17");
// getUser("sameer05515");

getRepos("sameer05515");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    let page = 1;
    const URL = 'https://api.github.com/users/sameer05515/repos?per_page=100&page='
    const finalData=[];
    let respData=[]
    do{
        const resp = await fetch(URL+ page);
        respData = await resp.json();

        for(let resp of respData){
            finalData.push(resp);
        }
        console.log('aaaa')
        //console.log(respData);
        page++;
    }while(respData && respData.length>0)
    
    console.log(finalData);

    createTable(finalData)
    

    //addReposToCard(respData);
}

function createTable(finalData){
    main.innerHTML = `
    <div>
        <table style="border-collapse: collapse; width: 100%;" border="1" id="mytable">
        <thead>
            <tr>
                <th style="width: 5%;" id="sl">#</th>
                <th style="width: 25%;" id="comp"><b>Name</b></th>
                <th style="width: 45%;"><b>Description</b></th>
                <th style="width: 25%;"><b>Language</b></th>
            </tr>
        </thead>

        <tbody id="table-body">

        </tbody>
        </table>
    </div>`;

    const tableBodyEl = document.getElementById("table-body");

    // for(fi of finalData){
    //     createUserCard(fi);
    // }
    let count=1;
    finalData.forEach((finalDataItem)=>{
        const trEl = document.createElement("tr");
        
        trEl.innerHTML =`        
                        <td style="width: 5%;"> ${count++}</td>
                        <td style="width: 25%;"> 
                            <a href="${finalDataItem.html_url}" target="_blank">
                                ${finalDataItem.name}
                            </a>
                        </td>
                        <td style="width: 45%;"> ${finalDataItem.description} </td>
                        <td style="width: 25%;"> ${finalDataItem.language} </td>                   
        `;
        tableBodyEl.appendChild(trEl)
    })
}

function createUserCard(user) {
    const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src="${user.html_url}" alt="${user.name}" />
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.description}</p>

                <!--
                <ul class="info">
                    <li>${user.followers}<strong>Followers</strong></li>
                    <li>${user.following}<strong>Following</strong></li>
                    <li>${user.public_repos}<strong>Repos</strong></li>
                </ul>
                <div id="repos"></div>
                -->                
            </div>
        </div>
    `;

    main.innerHTML += cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        getUser(user);

        search.value = "";
    }
});
