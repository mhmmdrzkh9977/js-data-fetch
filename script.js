// یک کلاس میسازیم تا ببتونیم به دیتا دسترسی داشته باشیح
class Starship {
  // در این قسمت ما فیلم های هر
  // starship
  // را میگیریم و از تابعی
  // async
  // استفاده میکنیم چون قراره درخواست بزنیم به سرور سپس دیتا ها رو کامل کنیم
  async getFilm(index) {
    this.starships[index].filmsTitle = [];
    for (const element of this.starships[index].films) {
      // روی تک تک فیلم ها درخواست میزنیم
      let filmTitle = (await fetch(element).then((response) => response.json()))
        .title;
      this.starships[index].filmsTitle.push(filmTitle);
    }
  }
  async getStarshipList() {
    //   در ابتدای کار این قسمت فراخوانی میشود تا تمام
    //   starship ها
    //   را بگیرد
    var starshiplist = document.getElementById("starship");
    this.starships = await fetch(
      `https://swapi.dev/api/starships/`
    ).then((response) => response.json());
    this.starships = this.starships.results;
    for (const element of this.starships) {
      // تک تکstarship
      // به html
      // اضافه میشود
      var item = `<li><button onclick="showDetail(${this.starships.indexOf(
        element
      )})">${element.name}</button></li>`;
      starshiplist.innerHTML = starshiplist.innerHTML + item;
      //   اگر فیلمی وجود داشته باشد دیتا های ان را میگیریم
      if (element.films) {
        this.getFilm(this.starships.indexOf(element));
      }
    }
  }
  //   وقتی رو هر کدوم از استارشیپ ها کلیک میشود این تابع قسمت
  //   html را
  //   پر میکند
  showDetail(index) {
    let name = this.starships[index].name;
    let model = this.starships[index].model;
    let manufacturer = this.starships[index].manufacturer;
    let passengers = this.starships[index].passengers;
    let crew = this.starships[index].crew;
    let detail = document.getElementById("detail-section");
    let films = document.getElementById("video-section");
    films.innerHTML = null;
    detail.innerHTML = `
    <h2> Detail of ${name} </h2>
      <ul>
            <li>
                <strong>Name:</strong> ${name}
            </li>
            <li>
                <strong>Model:</strong> ${model}
            </li>
            <li>
                <strong>Manufacturer: </strong>${manufacturer}
            </li>
            <li>
                <strong>Passengers: </strong>${passengers}
            </li>
            <li>
                <strong>Crew:</strong> ${crew}
            </li>
        </ul>
    `;
    if (this.starships[index].films) {
      let title = document.createElement("h2");
      title.innerHTML = "Films";
      films.appendChild(title);

      this.starships[index].filmsTitle.forEach((element) => {
        let film = document.createElement("p");
        film.innerHTML = element;
        films.appendChild(film);
      });
    }
  }
}
// یک نمونه از کلاس
// Starship
// میسازیم
const myStarship = new Starship();
// این تابع فراخوانی میشود در
// body
// تا دیتا ها fetch
// شود
function star() {
  myStarship.getStarshipList();
}
// وقتی کلیک میکنیم این تابع جزئبات را اپدیت میکند
function showDetail(index) {
  myStarship.showDetail(index);
}
