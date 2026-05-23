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
            title: "Дім Франка", 
            desc: "Автор фото: @ivankakalynii" 
        }, 
        "../img/places_3.jpg": { 
            title: "Елемент декору", 
            desc: "Автор фото: @ivankakalynii" 
        }, 
        "../img/places_4.jpg": { 
            title: "Дім Франка", 
            desc: "Автор фото: Олександр Маханець" 
		}, 
        "../img/places_5.jpg": { 
            title: "Ботанічний сад", 
            desc: "Власне фото" 
		}, 
        "../img/places_6.jpg": { 
            title: "Ботанічний сад", 
            desc: "Власне фото" 
		}, 
        "../img/places_7.jpg": { 
            title: "Ботанічний сад", 
            desc: "Фото було взяте з сайту: lviv.travel" 
		}, 
        "../img/places_8.jpg": { 
            title: "Львівський національний академічний театр опери та балету ім. Соломії Крушельницької", 
            desc: "Власне фото" 
		}, 
        "../img/places_9.jpg": { 
            title: "Вигляд всередині Львівської національної опери", 
            desc: "Фото було взяте з сайту: ukraine-is.com" 
		}, 
        "../img/places_10.jpeg": { 
            title: "Вигляд всередині Львівської національної опери", 
            desc: "Фото було взяте з сайту: lviv.travel" 
        }
    };

    function updateAllViews(index) {
        if (!thumbs[index]) return; 
        currentIndex = index;
        const pathInHtml = thumbs[currentIndex].getAttribute('src');
        const fullSrc = thumbs[currentIndex].src;

        if (mainImg) mainImg.src = fullSrc;
        if (modalImg) modalImg.src = fullSrc;

        const data = captionsData[pathInHtml] || { title: "Фото", desc: "Опис відсутній" };
        if (captionTitle) captionTitle.textContent = data.title;
        if (captionText) captionText.textContent = data.desc;
    }

    function showNext() {
        let index = (currentIndex + 1) >= thumbs.length ? 0 : currentIndex + 1;
        updateAllViews(index);
    }

    function showPrev() {
        let index = (currentIndex - 1) < 0 ? thumbs.length - 1 : currentIndex - 1;
        updateAllViews(index);
    }

 
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    if (nextBtn) nextBtn.addEventListener('click', showNext);
    if (prevBtn) prevBtn.addEventListener('click', showPrev);

    if (document.getElementById('modal-next')) {
        document.getElementById('modal-next').addEventListener('click', showNext);
    }
    if (document.getElementById('modal-prev')) {
        document.getElementById('modal-prev').addEventListener('click', showPrev);
    }

    if (mainImg) {
        mainImg.addEventListener('click', () => {
            if (lightbox) {
                lightbox.style.display = 'block';
                updateAllViews(currentIndex);
                document.body.style.overflow = 'hidden';
            }
        });
    }

    const closeBtn = document.querySelector('.close-lightbox');
    if (closeBtn) {
        closeBtn.onclick = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const dropdownLink = document.querySelector('.dropdown > a'); // Посилання "Цікаві місця"
    const submenu = document.querySelector('.submenu');

    // Відкриття/закриття головного мобільного меню
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('open');
            
            // Якщо закриваємо головне меню, то закриваємо й підменю теж
            if (!nav.classList.contains('open') && submenu) {
                submenu.classList.remove('open-submenu');
            }
        });
    }

    // Робота з підменю на мобільних пристроях
    if (dropdownLink && submenu) {
        dropdownLink.addEventListener('click', function(e) {
            // Спрацьовує лише на мобільних екранах (менше 769px)
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Скасовуємо перехід за посиланням, якщо воно є
                submenu.classList.toggle('open-submenu');
            }
        });
    }
});