const coffeeNames = ["Colombia Supremo", "Ethiopia Yirgacheffe", "Guatemala Antigua", "Brazil Cerrado", "Costa Rica Tarrazu", "Kenya AA", "Sumatra Mandheling", "Peru Organic", "Honduras Marcala", "El Salvador Finca", "Panama Geisha", "Yemen Mocha", "Rwanda Hingakawa", "Burundi Ngozi", "Mexico Altura", "Nicaragua Matagalpa", "India Monsooned", "Papua New Guinea", "Tanzania Peaberry", "Uganda Bugisu", "Bolivia Caranavi", "Ecuador Loja", "Dominican Republic", "Cuba Serrano", "Haiti Bleu", "Jamaica Blue Mountain", "Hawaii Kona", "DR Congo Kivu", "Malawi Pamwamba", "Zambia Mafinga"];
const chocolateNames = ["Madlen Kutusu", "Lavi Karışık", "Spesiyal Çikolata", "Truffle Seçkisi", "Pralin Kutusu", "Karamelli Tablet", "Beyaz Çikolata", "Bitter %70 Tablet", "Bitter %85 Tablet", "Sütlü Çikolata", "Bütün Fındıklı", "Antep Fıstıklı", "Kavrulmuş Bademli", "Tuzlu Karamelli", "Frambuaz Dolgulu", "Portakal Aromalı", "Nane Dolgulu Bitter", "Deniz Tuzlu Tablet", "Gofretli Spesiyal", "Çikolata Kaplı Lokum", "Meyveli Draje", "Kahve Çekirdekli Draje", "Rocher Kutu", "Ganaj Dolgulu", "Ruby Pembe Çikolata", "Vegan Bitter", "Şekersiz Sütlü", "Sıcak Çikolata Tozu", "Fondü Damla Çikolata", "Kuvertür Blok"];
const giftNames = ["Yeni Yaş Kutusu", "Geçmiş Olsun Seti", "Tebrikler Seti", "Sevgililer Günü Özel", "Yılbaşı Sepeti", "Anneler Günü Kutusu", "Babalar Günü Seti", "Kurumsal Premium VIP", "Aura V60 Seti", "Chemex Demleme Seti", "French Press Seti", "Moka Pot & Kahve", "Manuel El Değirmeni", "Hassas Barista Tartısı", "Tam Barista Kiti", "Aura Termos 1L", "Mini Termos 500ml", "Siyah Seramik Kupa", "Porselen Fincan Takımı", "Ahşap Kahve Kutusu", "Premium Çikolata Kutusu", "Mum ve Kahve Seti", "Deri Ajanda & Kahve", "Lüks Ofis Seti", "Hoş Geldin Bebek", "Yıl Dönümü Hatırası", "Teşekkür Kutusu", "Motivasyon Seti", "VIP Ahşap Sandık", "Altın Varaklı Özel Kutu"];

const coffeeImgs = [
    "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500&auto=format&fit=crop"
];

const chocImgs = [
    "https://kd-prod.sm.mncdn.com/product/image/ab4d811.jpg",
    "https://kd-prod.sm.mncdn.com/product/image/b60ad63.jpg",
    "https://kd-prod.sm.mncdn.com/product/image/66bae45.jpg"
];

const giftImgs = [
    "https://kd-prod.sm.mncdn.com/product/image/6cb029d.jpg",
    "https://kd-prod.sm.mncdn.com/product/image/7b0dcf3.jpg",
    "https://kd-prod.sm.mncdn.com/product/image/467b2be.jpg",
    "https://images.unsplash.com/photo-1495474472201-42b4d19324a3?q=80&w=500&auto=format&fit=crop"
];

let cart = [];

function generateProducts(names, images, priceMin, priceMax, gridId) {
    const grid = document.getElementById(gridId);
    if(!grid) return;
    
    let html = '';
    for(let i=0; i<30; i++) {
        const name = names[i];
        const img = images[i % images.length];
        const priceNum = Math.floor(Math.random() * (priceMax - priceMin) + priceMin);
        const price = priceNum + ",00 ₺";
        
        // Light theme spacious card styling
        html += `
            <div class="col-md-6 col-xl-4 mb-5">
                <div class="product-card h-100 d-flex flex-column border-0 shadow-sm" style="background: #ffffff; border-radius: 12px; transition: transform 0.3s, box-shadow 0.3s; overflow: hidden;">
                    <div class="product-img-wrapper position-relative" style="height: 280px; padding: 30px; background: #fafafa; display: flex; align-items: center; justify-content: center;">
                        <img src="${img}" alt="${name}" style="max-height: 100%; max-width: 100%; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));">
                    </div>
                    <div class="p-4 flex-grow-1 text-center d-flex flex-column bg-white">
                        <h5 class="fw-bold mb-2 font-heading text-dark" style="font-size: 1.1rem; letter-spacing: 0.5px;">${name}</h5>
                        <p class="text-muted small mb-3">Premium Aura Kalitesi</p>
                        <div class="product-price mb-4 text-dark" style="font-size: 1.3rem; font-weight: 800;">${price}</div>
                        <button class="btn w-100 mt-auto fw-bold" style="background: #f4f4f4; color: #000; border: none; padding: 12px; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#000'; this.style.color='#fff';" onmouseout="this.style.background='#f4f4f4'; this.style.color='#000';" onclick="addToCart('${name}', ${priceNum}, '${img}')">
                            SEPETE EKLE
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    grid.innerHTML = html;
}

function addToCart(name, price, img) {
    cart.push({ name, price, img });
    updateCartUI();
    
    // Open Offcanvas Cart Automatically
    const cartOffcanvas = new bootstrap.Offcanvas(document.getElementById('cartOffcanvas'));
    cartOffcanvas.show();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount) cartCount.innerText = cart.length;
    
    if (cartItems) {
        cartItems.innerHTML = '';
        let total = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-muted text-center mt-5">Sepetiniz şu an boş.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                cartItems.innerHTML += `
                    <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                        <img src="${item.img}" style="width: 60px; height: 60px; object-fit: contain; background: #fafafa; border-radius: 8px;" class="me-3">
                        <div class="flex-grow-1">
                            <h6 class="mb-0 text-dark fw-bold" style="font-size: 0.9rem;">${item.name}</h6>
                            <span class="text-muted small">${item.price},00 ₺</span>
                        </div>
                        <button class="btn btn-link text-danger p-0 ms-2" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
            });
        }
        
        if (cartTotal) cartTotal.innerText = total + ",00 ₺";
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function completeOrder() {
    if (cart.length === 0) return alert("Sepetiniz boş!");
    
    const btn = document.getElementById('checkout-btn');
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> İşleniyor...';
    btn.disabled = true;
    
    // Generate a unique Order ID
    const orderId = Math.floor(Math.random() * 9000) + 1000;
    const fullOrderId = `#ORD-${orderId}`;
    
    // Simulate secure Iyzico/Stripe API delay
    setTimeout(() => {
        // Collect order details
        let itemsStr = cart.map(i => i.name + ' (1 Adet)').join(', ');
        let total = cart.reduce((acc, curr) => acc + curr.price, 0);

        // Save order to LocalStorage for Admin Panel
        let liveOrders = JSON.parse(localStorage.getItem('aura_live_orders') || '[]');
        liveOrders.push({
            id: orderId, // Crucial for tracking
            customer: 'Admin',
            amount: total,
            items: itemsStr,
            note: 'Web sitesi üzerinden gelen yeni sipariş.',
            courier: 'Sistem Ataması'
        });
        localStorage.setItem('aura_live_orders', JSON.stringify(liveOrders));

        // Initial Tracking Status
        localStorage.setItem(`aura_order_status_${fullOrderId}`, "Sipariş Alındı");
        localStorage.setItem('aura_last_order_id', fullOrderId);

        cart = [];
        updateCartUI();
        btn.innerHTML = 'ÖDEMEYE GEÇ';
        btn.disabled = false;
        
        // Show success modal with tracking info
        document.getElementById('success-order-id').innerText = fullOrderId;
        const successModal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
        successModal.show();
    }, 2000);
}

// ==========================================
// ORDER TRACKING LOGIC
// ==========================================
function startTracking() {
    const orderId = localStorage.getItem('aura_last_order_id');
    if (!orderId) return;

    document.getElementById('tracking-order-id').innerText = orderId;
    const trackingModal = new bootstrap.Modal(document.getElementById('orderTrackingModal'));
    trackingModal.show();

    // Poll for status updates
    const pollInterval = setInterval(() => {
        const currentStatus = localStorage.getItem(`aura_order_status_${orderId}`);
        const statusEl = document.getElementById('tracking-status-text');
        const progressEl = document.getElementById('tracking-progress');
        
        if (statusEl) statusEl.innerText = currentStatus;

        // Update visual progress
        if (currentStatus === "Hazırlanıyor") {
            progressEl.style.width = "40%";
            progressEl.className = "progress-bar progress-bar-striped progress-bar-animated bg-warning";
        } else if (currentStatus === "Yola Çıktı") {
            progressEl.style.width = "75%";
            progressEl.className = "progress-bar progress-bar-striped progress-bar-animated bg-primary";
        } else if (currentStatus === "Teslim Edildi") {
            progressEl.style.width = "100%";
            progressEl.className = "progress-bar bg-success";
            clearInterval(pollInterval);
        }
    }, 2000);

    // Stop polling when modal is closed
    document.getElementById('orderTrackingModal').addEventListener('hidden.bs.modal', () => {
        clearInterval(pollInterval);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    generateProducts(coffeeNames, coffeeImgs, 250, 600, 'coffee-grid');
    generateProducts(chocolateNames, chocImgs, 300, 900, 'chocolate-grid');
    generateProducts(giftNames, giftImgs, 500, 2500, 'gifts-grid');
    updateCartUI();
});
