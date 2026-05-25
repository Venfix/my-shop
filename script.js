const products = [
    { id: 1, title: 'iPhone 15 Pro', price: '450 000 ₸', img: 'images/1.jpg', category: 'electronics' },
    { id: 2, title: 'MacBook M2 Air', price: '650 000 ₸', img: 'images/2.jpg', category: 'electronics' },
    { id: 3, title: 'Горный велосипед', price: '85 000 ₸', img: 'images/3.jpg', category: 'sport' },
    { id: 4, title: 'Sony PS5', price: '280 000 ₸', img: 'images/4.jpg', category: 'electronics' },
    { id: 5, title: 'Офисное кресло', price: '45 000 ₸', img: 'images/5.jpg', category: 'home' },
    { id: 6, title: 'Наушники Sony', price: '95 000 ₸', img: 'images/6.jpg', category: 'electronics' },
    { id: 7, title: 'Apple Watch', price: '150 000 ₸', img: 'images/7.jpg', category: 'electronics' },
    { id: 8, title: 'Скейтборд', price: '25 000 ₸', img: 'images/8.jpg', category: 'sport' }
];

const catalog = document.getElementById('catalog');
const modal = document.getElementById('modal');
const searchInput = document.getElementById('searchInput');

// Рендер карточек
function render(data) {
    catalog.innerHTML = data.map(item => `
        <div class="card" data-id="${item.id}">
            <img src="${item.img}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.price}</p>
            <button class="fav-btn">❤</button>
        </div>
    `).join('');
}

// Поиск по названию
searchInput.addEventListener('input', (e) => {
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    render(filtered);
});

// Фильтр категорий
function filterProducts(cat) {
    const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
    render(filtered);
}

// Слушатель кнопок категорий
document.addEventListener('DOMContentLoaded', () => {
    const filterBox = document.querySelector('.filters');
    if (filterBox) {
        filterBox.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                filterProducts(e.target.getAttribute('data-cat'));
            }
        });
    }
});

// Клик по карточкам и сердечкам
catalog.addEventListener('click', (e) => {
    // Если нажали на сердечко

const fav = e.target.closest('.fav-btn');
if (fav) {
    fav.classList.toggle('active'); // Переключает класс: есть класс -> нет класса
    return;
}

    // Если нажали на саму карточку — открываем модалку
    const card = e.target.closest('.card');
    if (card) {
        const id = card.getAttribute('data-id');
        const item = products.find(p => p.id == id);
        
        if (item) {
            document.getElementById('modalImg').src = item.img;
            document.getElementById('modalTitle').innerText = item.title;
            document.getElementById('modalPrice').innerText = item.price;
            modal.style.display = 'block';
        }
    }
});

// Закрыть модалку
function closeModal() {
    modal.style.display = 'none';
}

// Старт
render(products);