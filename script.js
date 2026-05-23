document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.sidebar-filter li');
    const placeCards = document.querySelectorAll('.place-card');

    // 1. Універсальна функція фільтрації
    function applyFilter(category) {
        // Оновлюємо активний клас у сайдбарі
        filterItems.forEach(item => {
            if (item.getAttribute('data-filter') === category) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Показуємо або ховаємо картки з легкою анімацією
        placeCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (category === 'all' || cardCategory === category) {
                card.style.display = 'flex';
                // Коротка затримка для ефекту появи
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.4s ease';
                    card.style.opacity = '1';
                }, 10);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    }

    // 2. Обробка кліків по кнопках фільтрації (сайдбар)
    filterItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            
            applyFilter(filterValue);
            
            // Оновлюємо URL у браузері, щоб користувач міг скопіювати посилання на конкретну категорію
            const newUrl = filterValue === 'all' ? 'places.html' : `?category=${encodeURIComponent(filterValue)}`;
            window.history.pushState({}, '', newUrl);
        });
    });

    // 3. Перевірка при завантаженні: якщо в URL є параметр ?category=...
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');

    if (categoryFromUrl) {
        applyFilter(categoryFromUrl);
    } else {
        // Якщо параметрів немає, активуємо "Всі місця" за замовчуванням
        applyFilter('all');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const filterItems = document.querySelectorAll('.sidebar-filter li');
    const galleryItemsRaw = document.querySelectorAll('.gallery-item-clean');
    const galleryArray = Array.from(galleryItemsRaw); 
    
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const lbVideo = document.getElementById('lightbox-video');
    const lbTitle = document.getElementById('caption-title');
    const lbText = document.getElementById('caption-text');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    let currentIndex = 0; 
	
	
    function applyFilter(category) {
        filterItems.forEach(item => {
            if (item.getAttribute('data-filter') === category) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        galleryArray.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const filterValue = this.getAttribute('data-filter');
            applyFilter(filterValue);
        });
    });


   
    function updateLightbox(index) {
        
        if (index < 0) index = galleryArray.length - 1;
        if (index >= galleryArray.length) index = 0;
        
        currentIndex = index;
        const item = galleryArray[currentIndex];
        
        const category = item.getAttribute('data-category');
        const title = item.getAttribute('data-title');
        const desc = item.getAttribute('data-description');

        lbTitle.innerText = title;
        lbText.innerText = desc;

        if (category === 'video') {
            
            lbImg.style.display = 'none';
            lbVideo.style.display = 'block';
            const videoSrc = item.querySelector('video').src;
            lbVideo.src = videoSrc;
            lbVideo.play();
        } else {
            
            lbVideo.style.display = 'none';
            lbVideo.pause();
            lbVideo.src = ""; 
            lbImg.style.display = 'block';
            const imgUrl = item.querySelector('img').src;
            lbImg.src = imgUrl;
        }
    }
	




    
    galleryArray.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateLightbox(index);
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
        });
    });

    
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        updateLightbox(currentIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        updateLightbox(currentIndex + 1);
    });

    
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        lbVideo.pause();
        lbVideo.src = "";
    };

    closeBtn.onclick = closeLightbox;

    
    lightbox.onclick = (e) => {
        if (e.target === lightbox) closeLightbox();
    };

    
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'block') {
            if (e.key === "ArrowLeft") updateLightbox(currentIndex - 1);
            if (e.key === "ArrowRight") updateLightbox(currentIndex + 1);
            if (e.key === "Escape") closeLightbox();
        }
    });

    
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    if (categoryFromUrl) {
        applyFilter(categoryFromUrl);
    }
});




