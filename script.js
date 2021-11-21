//navigte to repo.html onclicking click here button
function getRepoHomePage(){
    location.replace("repo.html");
}

let imgSrc="";
let apiData,JsonData,totalRepoCount;
//function to fetch api data using async await
async function getApiData(){
    try{
        apiData = await fetch("https://api.github.com/users/octokit/repos");
        JsonData = await apiData.json();
        let jsonOne = JsonData[0];

        //get the avatar url
        imgSrc=jsonOne.owner.avatar_url;
        avatar.src = imgSrc;
        
        //select p tag set for displaying name and set name to the p tag
        let onwerName = document.querySelector('p');
        onwerName.innerText = jsonOne.owner.login;

    }
    catch(error){
        document.getElementById("topNav").style.display = "none";
        document.getElementById("ownerImg").style.display = "none";
        document.getElementById("errorMessage").innerHTML = `Something has went wrong !!!<br><br> ${error}`;
    }

}    

//add eventlistenet to repositories link in top nav
document.getElementById("repositories").addEventListener("click",getRepoList);
let repoLinks = document.getElementById("repoLinks");
let showCountDiv = document.getElementById("showCount");


//get repositories list and display it as links
function getRepoList(){
    
    //get repository url in loop
   JsonData.forEach(function (element, i) {
        let eachRepoLink = element.html_url;
        let fullName = element.full_name;

     //get the star count and fork count 
     let starCount = element.stargazers_count;
     let forkCount = element.forks_count;  
     let visibility = element.visibility;
              
        //create separate div for each repository under repoLinks div
        let subDiv = document.createElement('div'); 
       let repCount = "rep"+i;
       subDiv.id=repCount;
      
       //create anchor tag for each repository
       let aTag = document.createElement('a');
       aTag.setAttribute('href',eachRepoLink);
       aTag.innerText = fullName;
       subDiv.appendChild(aTag);

       //create span tag to show visibility
       let spanTag = document.createElement('span');
       spanTag.className="Label Label--secondary v-align-middle ml-1 mb-1";
       spanTag.innerText = visibility;
       subDiv.appendChild(spanTag);
       
       //collect star count and display as separate div under link
       let starDiv = document.createElement('div'); 
       let starDivCount = "star"+i;
       starDiv.id = starDivCount;
       starDiv.className = "starsDiv text-dark";
       starDiv.innerHTML = `Stars : ${starCount}`;
       subDiv.appendChild(starDiv);

       //collect fork count and display as separate div under link
       let forkDiv = document.createElement('div'); 
       let forkDivCount = "fork"+i;
       forkDiv.id = forkDivCount;
       forkDiv.className = "ForksDiv text-dark";
       forkDiv.innerHTML = `Forks : ${forkCount}`;
       subDiv.appendChild(forkDiv);


       //separate each repo by horizontal line
       let hrTag = document.createElement('hr');
       subDiv.appendChild(hrTag);

       totalRepoCount =i;

       repoLinks.appendChild(subDiv);
       repoLinks.style.display="block";  
       
   });

   document.getElementById("totalRepo").innerText = totalRepoCount;
}
