const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
rotateOptions = document.querySelectorAll(".rotate button"),
filterSlider = document.querySelector(".slider input"),
previewImg = document.querySelector(".preview-img img"),
chooseImgBtn = document.querySelector(".choose-img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector(".save-img");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVertical=1;

const applyFilter = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        
        switch (option.id) {
            case "brightness":
                filterSlider.max-"200";
                filterSlider.value = `${brightness}`;
                filterValue.innerText = `${brightness}%`;
                break;
            case "saturation":
                filterSlider.max-"200";
                filterSlider.value = `${saturation}`;
                filterValue.innerText = `${saturation}%`;
                break;
            case "inversion":
                filterSlider.max-"100";
                filterSlider.value = `${inversion}`;
                filterValue.innerText = `${inversion}%`;
                break;
            case "grayScale":
                filterSlider.max-"100";
                filterSlider.value = `${grayScale}`;
                filterValue.innerText = `${grayScale}%`;
                break;
            default:
                break;
        }
    })
})

rotateOptions.forEach(option => {
    option.addEventListener("click", ()=>{
        previewImg.style.transform = option.innerText;
        switch(option.id){
            case "left":
                rotate-=90;
                break;
            case "right":
                rotate+=90;
                break;
            case "vertical":
                flipVertical = flipVertical === 1 ? -1 : 1;                
            case "horizontal":
                flipHorizontal = flipHorizontal === 1 ? -1 : 1;
            default:
                break;
        }
        applyFilter();
    })
})

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else if(selectedFilter.id === "grayScale"){
        grayScale = filterSlider.value;
    }
    applyFilter();
}

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical=1;
    filterOptions[0].click();
    applyFilter();
}

const saveImg = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    ctx.filter =  `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL()
    link.click();
} 

fileInput.addEventListener("change", loadImage);
saveImgBtn.addEventListener("click", saveImg)
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
chooseImgBtn.addEventListener("click", () => fileInput.click());