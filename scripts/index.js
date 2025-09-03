let lessonBar = document.getElementById("lesson-bar");
let AllLevelUrl = "https://openapi.programming-hero.com/api/levels/all";
let levelBaseUrl = "https://openapi.programming-hero.com/api/level/";

let level = (l) => {
  fetch(`${levelBaseUrl}${l}`)
  .then(res => res.json())
  .then(json => console.log(json.data));
  console.log("Clicked level:", l);
}

fetch(AllLevelUrl)
  .then(res => res.json())
  .then(json => {
    json.data.forEach(e => {
      let btn = document.createElement("button");
      btn.className = "btn btn-outline btn-primary text-xs p-2 h-fit";
      btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${e.level_no}`;
      
      // 👇 fix here
      btn.addEventListener("click", () => level(e.level_no));

      lessonBar.appendChild(btn);
    });
  });
