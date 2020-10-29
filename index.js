const gifBtn = document.getElementById("option1");
const stikBtn = document.getElementById("option2");
const formTwo = document.getElementById("otherQuestion");
const lastForm = document.getElementById("lastQuestion");
const wrapper = document.querySelector(".wrapper");
let url;

gifBtn.addEventListener("click", showSlider);
stikBtn.addEventListener("click", showSlider);

const key = "eS3Gx4113rKL1VFZ7RI2mi8k4itskZJC";
 

function showSlider(e) {
    e.preventDefault();
    while(formTwo.firstChild){
        formTwo.removeChild(formTwo.firstChild)
    }
    while(lastForm.firstChild){
        lastForm.removeChild(lastForm.firstChild)
    }
    let type = document.querySelector('input[name="type"]:checked').value;
    let weirdSlider = document.createElement("div");
    weirdSlider.classList.add("weirdSlider")
    weirdSlider.innerHTML = `<h3>Awesome! How weird do you want your ${type} to be?</h3>
    <span class="labelSlider not">not <br> weird</span><span class="labelSlider super">super <br> weird</span>
    <input type="range" min="0" name="sliderValue" max="10" class="sliders" id="weirdnessValue">`
    formTwo.appendChild(weirdSlider);
    let actualSlider = document.getElementById("weirdnessValue");
    actualSlider.addEventListener("click", function(){showFinal(e, type)})
}

function showFinal(e, type){
    e.preventDefault();
    while(lastForm.firstChild){
        lastForm.removeChild(lastForm.firstChild)
    }
    let searchTerm = document.createElement("div");
    let sliderValue = document.querySelector('input[name="sliderValue"').value;
    console.log(sliderValue);
    console.log(type);
    searchTerm.classList.add("searchTerm");
    searchTerm.innerHTML = `<h3>Finally, what do you want a ${type} of?</h3>
    <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="search term" id= "searchTerm" aria-describedby="button-addon2" required>
        <div class="input-group-append">
          <button class="btn  btn-dark" type="submit" id="button-addon2"><i class="fa fa-search"></i></button>
        </div>
      </div>`
    lastForm.appendChild(searchTerm);
    lastForm.addEventListener("submit", showResults);
    lastForm.type = type;
    lastForm.sliderValue = sliderValue;

}

function showResults(e){
    e.preventDefault();
    let searchTerm = document.getElementById("searchTerm")
    url = "https://api.giphy.com/v1/" + lastForm.type + "s/translate?api_key=" + key + "&s=" + searchTerm.value+ "&weirdness=" + lastForm.sliderValue;
    console.log(url);
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json){
        while(wrapper.firstChild){
            wrapper.removeChild(wrapper.firstChild);
        }
        let embed = json.data.embed_url;
        let linky = json.data.bitly_url;
        let resultPage = document.createElement("div");
        resultPage.innerHTML = `<div class="embed-responsive embed-responsive-4by3 imgResult">
            <iframe class="embed-responsive-item" src="${embed}" ></iframe>
            </div>
            <button type="button" class="btn btn-outline-light" id="copy">Copy Link to Clipboard</button> <br>
            <button type="button" class="btn btn-dark" id="reset">Try again?</button>
        `
        wrapper.appendChild(resultPage);
        let copyBtn = document.getElementById("copy");
        copyBtn.addEventListener("click", function(){copyLink(e, linky)});
        let resetBtn = document.getElementById("reset");
        resetBtn.addEventListener("click", redo)
    })
}


function copyLink(e, link) {
    e.preventDefault();
    navigator.clipboard.writeText(link).then(function() {
        alert("Copied!");
    }, function() {
        alert("Sorry! Copy function is not compatible. :C");
    });
}

function redo(e) {
    e.preventDefault();
    location.reload();
}