//  some utilities
let lessonBar = document.getElementById("lesson-bar");
let container = document.getElementById("container");

//  {word: 'Fascinate', meaning: 'মুগ্ধ করা', pronunciation: 'ফ্যাসিনেট', level: 5, sentence: "The magician's tricks fascinate the audience.", …}
//  word info button's functionality
let wordDetails = async (id) => {
  let details = await (await fetch(`https://openapi.programming-hero.com/api/word/${id}`)).json();
  document.querySelector("#my_modal_5 h3").innerHTML = `${details.data.word ? details.data.word : "not found"} (<i class="fa-solid fa-microphone-lines"></i> : ${details.data.pronunciation ? details.data.pronunciation : "not found"})`
  document.querySelector("#my_modal_5 .meaning").innerHTML = details.data.meaning ? details.data.meaning : "not found";
  document.querySelector("#my_modal_5 .example").innerHTML = details.data.sentence ? details.data.sentence : "not found";
  details.data.synonyms.forEach(e => {
    console.log(e)
    let b = document.createElement("span")
    b.className = "bg-sky-100 text-sm px-4 py-2 rounded"
    b.innerText = e
    document.querySelector("#my_modal_5 .synonyms").appendChild(b)
  })
  console.log(details.data)
  my_modal_5.showModal();
}


//  level button functionality
let level = (l) => {
  fetch(`https://openapi.programming-hero.com/api/level/${l}`)
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
          box.className = "flex flex-col gap-3 items-center justify-center text-center bg-white p-6 rounded-lg";
          box.innerHTML = `<h5 class="text-2xl font-bold">${e.word ? e.word : "word not found"}</h5>
                    <p class="text-sm bangla">Pronounciation - ${e.pronunciation ? e.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</p>
                    <h6 class="text-lg bangla font-semibold">Meaning - ${e.meaning ? e.meaning : "শব্দার্থ পাওয়া যায়নি"}</h6>
                    <div class="flex items-center justify-between w-full">
                        <button class="btn" onclick="wordDetails(${e.id})"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn" onclick="wordDetails(${e.id})"><i class="fa-solid fa-volume-high"></i></button>
                    </div>`;
          container.appendChild(box);
        });
      }
    });
}


//  Show all levels in the UI with active buttons
fetch("https://openapi.programming-hero.com/api/levels/all")
  .then(res => res.json())
  .then(json => {
    json.data.map(e => {
      let btn = document.createElement("button");
      btn.className = "btn btn-outline btn-primary text-xs p-2 h-fit";
      btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson - ${e.level_no}`;
      btn.addEventListener("click", (event) => {
        lessonBar.querySelectorAll("button").forEach(b => {
          b.classList.remove("active");
        });
        event.target.classList.add("active");
        level(e.level_no)
      });
      lessonBar.appendChild(btn);
    });
  });
