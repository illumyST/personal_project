$(window).scroll(function () {
    if ($(window).scrollTop() > (150)) {
        if ($(".progress").hasClass("progressHide")) {
            $(".progress").toggleClass("progressHide");
        }
    } else {
        $(".progress").addClass("progressHide");
    }
});

// 即時預覽文字 -------------------------------
let TAfinish=0;
let textarea = document.getElementById("textarea");
let imgP = document.getElementById("imgP");

textarea.addEventListener('focus', function () {
    if (this.value == '請輸入您的心意吧！建議文長100-200字唷！') {
        textarea.value = '';
        TAfinish=0;
    }
});
textarea.addEventListener('blur', function () {
    if (this.value == '') {
        textarea.style.color = "var(--pri_green)";
        textarea.value = '請輸入您的心意吧！建議文長100-200字唷！';
        TAfinish=0;
    }
});

textarea.addEventListener('keyup', function () {
    textarea.style.color = "var(--pri_brown)";
    imgP.innerText = textarea.value;
    TAfinish=1;
})

// 點擊切換圖片 -------------------------------
let flowerBtns = document.getElementsByClassName("fl");
let flowerShow = document.getElementsByClassName("flowerShow")[0];


for (let i of flowerBtns) {
    i.addEventListener('click', function (e) {
        e.preventDefault();
        flowerShow.setAttribute("src", this.querySelector("img").getAttribute("src"));
    })
}




// 自動定位函式 -------------------------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var NS = position.coords.latitude;
    var WE = position.coords.longitude;

    //解讀所在的城市名稱
    fetch('http://ip-api.com/json')
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response.country + ', ' + response.city);
        });
}
let positionBtn = document.getElementsByClassName("position")[0];
let locationInput = document.getElementById("location");

positionBtn.addEventListener('click', function (e) {
    // form 裡面的 btn 會造成頁面重整
    e.preventDefault();
    let ans = confirm(`歡迎使用自動定位！
- 顯示「所在城市」請按「OK」
- 顯示「所在經緯度」請按「Cancel」
`);
    if (ans) {
        fetch('http://ip-api.com/json')
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                locationInput.value = `${response.country}  , ${response.city}`;
            });
    } else {
        getLocation();
    }


});

// 經緯度顯示自動定位
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationInput.value = "Geolocation is not supported by this browser.";
    }
};
function showPosition(position) {
    var NS = (position.coords.latitude).toFixed(3);
    var WE = (position.coords.longitude).toFixed(3);
    locationInput.value = `經度 ${WE} ， 緯度 ${NS}`;
};

// 進度條 --------------------------------------
let inputs = document.querySelectorAll("form .formInput");
let form = document.getElementsByTagName("form")[0];
let progressSpan = document.getElementsByClassName("progressSpan")[0];
let pro1 = document.getElementsByClassName("pro1")[0];
let pro2 = document.getElementsByClassName("pro2")[0];
let pro3 = document.getElementsByClassName("pro3")[0];
form.addEventListener('click', function () {
    let progressAmount = 0;
    for (let i of inputs) {
        if (i.value) {
            progressAmount += 1;
        }
    }
    if(TAfinish){
        progressAmount += 1;
    }
    if(progressAmount==6){
        pro1.style.backgroundColor = "var(--pri_green)"
    }
    progressSpan.style.height = `${progressAmount/7/2*100}%`
});


let progress = document.getElementsByClassName("progress")[0];

window.addEventListener('scroll',function(){
    // console.log(scrollY)
    if(pro1.style.backgroundColor == "var(--pri_green)"){
        let a = 42; // 視覺上一半的 span
       if(scrollY>930 && scrollY < 1500){
        pro2.style.backgroundColor = "var(--pri_green)";
        progressSpan.style.height = `${a+((scrollY-930)/(1500-930))*50}%`
       }
    };

    // 控制進度條不要到最底
    if(this.scrollY >=1380){
        progress.classList.add("stop");
    }else{
        progress.classList.remove("stop");
    }
})

