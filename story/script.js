document.addEventListener('DOMContentLoaded', function() {
    const mainImg = document.getElementById('main-view');
    const thumbs = document.querySelectorAll('.thumb');
    const modalImg = document.getElementById('modal-img');
    const lightbox = document.getElementById('article-lightbox');
    const captionTitle = document.getElementById('caption-title');
    const captionText = document.getElementById('caption-text');

    let currentIndex = 0;

    const captionsData = {
    "../img/places_2.jpg": { 
        title: "", 
        desc: "Автор фото: @ivankakalynii" 
    },
    "../img/places_3.jpg": { 
        title: "", 
        desc: "Автор фото: @ivankakalynii" 
    },
	"../img/places_4.jpg": { 
        title: "", 
        desc: "Автор фото: Олександр Маханець" 
	},
	"../img/places_7.jpg": { 
        title: "", 
        desc: "Фото було взяте з сайту - lviv.travel" 
	},
	"../img/places_5.jpg": { 
        title: "", 
        desc: "Власне фото" 
	},
	"../img/places_6.jpg": { 
        title: "", 
        desc: "Власне фото" 
	},
	"../img/places_8.jpg": { 
        title: "", 
        desc: "Власне фото" 
	},
	"../img/places_9.jpg": { 
        title: "", 
        desc: "Фото було взяте з сайту t1.ua" 
	},
	"../img/places_10.jpeg": { 
        title: "", 
        desc: "Фото було взяте з сайту - lviv.travel" 
    }
};

	
    function updateAllViews(index) {
    currentIndex = index;
    
    const pathInHtml = thumbs[currentIndex].getAttribute('src');
    const fullSrc = thumbs[currentIndex].src;

    thumbs.forEach(t => t.classList.remove('active-thumb'));
    thumbs[currentIndex].classList.add('active-thumb');

    mainImg.src = fullSrc;

    modalImg.src = fullSrc;

    const data = captionsData[pathInHtml] || { title: "Фото", desc: "Опис відсутній" };
    captionTitle.textContent = data.title;
    captionText.textContent = data.desc;
}

    function showNext() {
        let index = (currentIndex + 1) >= thumbs.length ? 0 : currentIndex + 1;
        updateAllViews(index);
    }

    function showPrev() {
        let index = (currentIndex - 1) < 0 ? thumbs.length - 1 : currentIndex - 1;
        updateAllViews(index);
    }

    document.getElementById('next-btn').addEventListener('click', showNext);
    document.getElementById('modal-next').addEventListener('click', showNext);
    
    document.getElementById('prev-btn').addEventListener('click', showPrev);
    document.getElementById('modal-prev').addEventListener('click', showPrev);

    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => updateAllViews(index));
    });

    mainImg.addEventListener('click', () => {
        lightbox.style.display = 'block';
        updateAllViews(currentIndex); 
        document.body.style.overflow = 'hidden';
    });

    document.querySelector('.close-lightbox').onclick = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
});