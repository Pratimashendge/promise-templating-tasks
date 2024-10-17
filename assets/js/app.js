const blogForm = document.getElementById("blogForm");
const titleControl = document.getElementById("title");
const contentControl = document.getElementById("content");
const cardContainer = document.getElementById("cardContainer");

let blogArr = [];

const snackbar = (msg, icon) => {
  swal.fire({
    title: msg,
    icon: icon,
    timer: 2500,
  });
};

const createBlogCards = (arr) => {
  let result = "";
  arr.forEach((blog) => {
    result += `
         <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <h2 class="mb-0">${blog.title}</h2>
                    </div>
                    <div class="card-body">
                        <p class="mb-0">
                            ${blog.content}
                        </p>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-sm btn-primary">Edit</button>
                        <button class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
             </div>
        `;
  });
  cardContainer.innerHTML = result;
};

const fetchBlogs = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() >= 0.2 ? true : false;
      if (success) {
        resolve({
          data: blogArr,
          msg: "All blogs fetched successfully !!!",
        });
      } else {
        reject("something went wrong while fetching blog");
      }
    }, 1500);
  });
};

const createBlogs = (blog) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() >= 0.2 ? true : false;
      if (success) {
        blogArr.push(blog);
        resolve("new blog is created");
      } else {
        reject("something went wrong while creating blog");
      }
    }, 1000);
  });
};

const onBlogAdd = (eve) => {
  eve.preventDefault();

  let blogObj = {
    title: titleControl.value,
    content: contentControl.value,
  };

  createBlogs(blogObj)
    .then((msg) => {
      snackbar(msg, "success");
      return fetchBlogs();
    })
    .then((res) => {
      console.log(res);
      snackbar(res.msg, "success");
      createBlogCards(res.data);
    })
    .catch((err) => snackbar(err, "error"))
    .finally(() => {
      blogForm.reset();
    });
};

blogForm.addEventListener("submit", onBlogAdd);