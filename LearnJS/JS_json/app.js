  
var courseAPI = 'http://localhost:3000/courses'


function start(){
    getCourses(renderCourses);
    handleCreateForm();
}

start();

//Funtion

function getCourses(callback){
    fetch(courseAPI)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

//Them

function createCourse(data,callback){
    var options ={
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body:JSON.stringify(data)
    }
    fetch(courseAPI,options)
      .then(function(response){
          response.json();
      })
      .then(callback);
}

//Xoa
function deleteCourse(id){
    var options ={
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },       
    }
    fetch(courseAPI + '/' + id,options)
      .then(function(response){
          response.json();
      })
      .then(function(){
       var courseItem = document.querySelector('.course-item-' + id);
       if (courseItem){
            courseItem.remove();  
       }
      })
}

//update 

function updateCourse(id){
    var options ={
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },  
          body:JSON.stringify({
            name: document.querySelector('input[name=name]').value,
            description: document.querySelector('input[name=description]').value
          })     
    }
    fetch(courseAPI + '/' + id,options)
      .then(function(response){
          response.json();
      })
      .then(function(){
        getCourses(renderCourses);   
      })
}


function renderCourses(courses){
    var listCoursesBlock =
document.querySelector('#list-courses')
var htmls = courses.map(function(course){
    return ` 
    <li class="course-item-${course.id}">
     <h4>  ${course.name} </h4>
     <p>   ${course.description} </p>
     <button onclick="deleteCourse(${course.id})"> Xoa </button>
     <button onclick="updateCourse(${course.id})"> Cap nhat </button>
    </li>
    `;
});
   listCoursesBlock.innerHTML = htmls.join ('');
};

function handleCreateForm(){
  var createBtn = document.querySelector('#create');
  createBtn.onclick= function(){
      var name = document.querySelector('input[name = "name"]').value;
      var description = document.querySelector('input[name = "description"]').value;
      
    var formData = {
        name: name,
        description:description
    }
    createCourse(formData,function(){
        getCourses(renderCourses);
    })
  }

}