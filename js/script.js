async function fetchUserData() {
  let userUrl = "https://jsonplaceholder.typicode.com/users";

  const res = await fetch(userUrl);
  const data = res.json();

  return data;
}

async function fetchUserPosts(id) {
  let userPostsUrl = "https://jsonplaceholder.typicode.com/posts?userId=" + id;

  const res = await fetch(userPostsUrl);
  const data = res.json();

  return data;
}

const clickUser = async (id) => {
  let data;
  try {
    data = await fetchUserPosts(id);
  } catch (error) {
    console.log(error);
  }

  let postsBody = document.getElementById("postsData");

  let dataDiv = "";
  let colCounter = 0;
  let currentUser = `<div class="jumbotron jumbotron-fluid text-center">
                        <div class="container">
                            <h1 class="display-4">Posts from user: #${id}</h1>
                            <p class="lead">This user has ${data.length} posts.</p>
                        </div>
                    </div>`;

  for (let i = 0; i < data.length; i++) {
    let tempData = "";

    let dataFormat = `<div class="col-sm-3 text-center" >
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${data[i].title}</h5>
                                <p class="card-text">${data[i].body}</p>
                                <p class="card-text">User ID: ${data[i].userId} - Post ID: ${data[i].id}</p>
                            </div>
                        </div>
                      </div>`;

    if (i % 4 === 0) {
      tempData += `<div class="row">${dataFormat}`;
    } else {
      tempData += dataFormat;
    }

    colCounter++;

    if (colCounter === 4) {
      tempData += `</div>`;
      colCounter = 0;
    }

    dataDiv += tempData;
  }
  postsBody.innerHTML = currentUser + dataDiv;
};

const buildTable = async () => {
  let data;
  try {
    data = await fetchUserData();
  } catch (error) {
    console.log(error);
  }

  let table = document.getElementById("tableBody");
  let tableCSS = document.querySelector("#mainTable");
  let spinner = document.querySelector("#spinner");

  for (let i = 0; i < data.length; i++) {
    let tempRow = `<tr>
                    <td>${data[i].id}</td>
                    <td>${data[i].username}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].email}</td>
                    <td onclick="clickUser(${data[i].id})"><button type="button" class="btn btn-dark">See User Posts</button></td>
                   </tr>`;
    table.innerHTML += tempRow;
  }

  spinner.classList.add("hidden");
  tableCSS.classList.remove("hidden");
};

buildTable();
