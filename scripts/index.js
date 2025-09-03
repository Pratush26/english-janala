let lessonBar = document.getElementById("lesson-bar");
let AllLevelUrl = "https://openapi.programming-hero.com/api/levels/all";
let levelBaseUrl = "https://openapi.programming-hero.com/api/level/";
let container = document.getElementById("container");

let level = (l) => {
  fetch(`${levelBaseUrl}${l}`)
    .then(res => res.json())
    .then(json => {
      container.innerHTML = "";
      if (json.data.length == 0) {
        let box = document.createElement("span");
        box.className = "flex flex-col gap-3 items-center justify-center bangla col-span-3 p-6 rounded-lg";
        box.innerHTML = `<img src="./assets/alert-error.png" alt="alert sign">
                      <small class="text-gray-500 text-xs font-semibold">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                    <p class="font-semibold text-lg text-gray-800">নেক্সট Lesson এ যান</p>`
        container.append(box);
      } else {
        json.data.map(e => {
          let box = document.createElement("span");
          box.className = "flex flex-col gap-3 items-center justify-center bg-white p-6 rounded-lg";
          box.innerHTML = `<h5 class="text-2xl font-bold">${e.word}</h5>
                      <p class="text-sm bangla">Pronounciation - ${e.pronunciation}</p>
                      <h6 class="text-lg bangla font-semibold">Meaning - ${e.meaning}</h6>
                      <div class="flex items-center justify-between w-full">
                          <i class="fa-solid fa-circle-info"></i>
                          <i class="fa-solid fa-volume-high"></i>
                      </div>`;
          container.append(box);
        });
      }
    });
}

// {id: 3, level: 2, word: 'Cautious', meaning: 'সতর্ক', pronunciation: 'কশাস'}
fetch(AllLevelUrl)
  .then(res => res.json())
  .then(json => {
    json.data.map(e => {
      let btn = document.createElement("button");
      btn.className = "btn btn-outline btn-primary text-xs p-2 h-fit";
      btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${e.level_no}`;
      btn.addEventListener("click", () => level(e.level_no));
      lessonBar.append(btn);
    });
  });
