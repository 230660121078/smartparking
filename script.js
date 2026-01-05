document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENT SELECTORS ---
    const guestNav = document.getElementById('guestNav');
    const userNav = document.getElementById('userNav');
    const displayUsername = document.getElementById('displayUsername');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Modals
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const aboutModal = document.getElementById('aboutModal');
    const demoModal = document.getElementById('demoModal'); // Modal Video

    // --- 1. LOGIKA TONTON DEMO (VIDEO) ---
    const demoBtn = document.querySelector('.action-demo');
    const closeDemo = document.querySelector('.close-demo');
    const youtubeFrame = document.getElementById('youtubeVideo');
    
    // Link Video YouTube (Contoh: Video Smart Parking Futuristik)

    const videoSrc = "https://www.youtube.com/embed/enK-wrYcIrQtGsae";

    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (demoModal) {
                demoModal.style.display = 'flex';
                // Set source video saat dibuka agar autoplay jalan
                youtubeFrame.src = videoSrc;
            }
        });
    }

    // Fungsi Tutup Video (Penting: Reset src agar suara video berhenti)
    function closeVideo() {
        if (demoModal) {
            demoModal.style.display = 'none';
            youtubeFrame.src = ""; // Matikan video
        }
    }

    if (closeDemo) {
        closeDemo.addEventListener('click', closeVideo);
    }

    // --- 2. LOGIKA PELAJARI LEBIH LANJUT ---
    const learnMoreBtn = document.getElementById('learnMoreBtn') || document.querySelector('.action-more');
    const closeAbout = document.querySelector('.close-about');
    const closeAboutBtn = document.querySelector('.close-about-btn');

    if (learnMoreBtn) learnMoreBtn.addEventListener('click', (e) => { e.preventDefault(); aboutModal.style.display = 'flex'; });
    if (closeAbout) closeAbout.addEventListener('click', () => aboutModal.style.display = 'none');
    if (closeAboutBtn) closeAboutBtn.addEventListener('click', () => aboutModal.style.display = 'none');

    // --- 3. LOGIKA LOGIN ---
    const loginBtn = document.getElementById('loginBtn');
    const closeLogin = document.querySelector('.close-login');
    const loginForm = document.getElementById('loginForm');

    if (loginBtn) loginBtn.addEventListener('click', (e) => { e.preventDefault(); loginModal.style.display = 'flex'; });
    if (closeLogin) closeLogin.addEventListener('click', () => loginModal.style.display = 'none');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === "admin@smartpark.com" && password === "admin123") {
                simulateAuth("Sedang masuk...", "Halo, Admin");
                loginModal.style.display = 'none';
                loginForm.reset();
            } else {
                alert("❌ Login Gagal! Gunakan: admin@smartpark.com / admin123");
            }
        });
    }

    // --- 4. LOGIKA REGISTER ---
    const regButtons = document.querySelectorAll('.open-register-btn');
    const closeRegister = document.querySelector('.close-register');
    const registerForm = document.getElementById('registerForm');

    regButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            registerModal.style.display = 'flex';
        });
    });

    if (closeRegister) closeRegister.addEventListener('click', () => registerModal.style.display = 'none');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value;
            simulateAuth("Membuat Akun...", "Halo, " + name);
            registerModal.style.display = 'none';
            registerForm.reset();
            alert("✅ Akun berhasil dibuat! Selamat datang, " + name);
        });
    }

    // --- 5. SISTEM UMUM & KLIK DILUAR MODAL ---
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === registerModal) registerModal.style.display = 'none';
        if (e.target === aboutModal) aboutModal.style.display = 'none';
        
        // Khusus video, panggil fungsi closeVideo agar suara mati
        if (e.target === demoModal) closeVideo();
    });

    function simulateAuth(loadingText, usernameText) {
        guestNav.style.display = 'none';
        userNav.style.display = 'flex';
        displayUsername.innerText = usernameText;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm("Yakin ingin keluar?")) {
                userNav.style.display = 'none';
                guestNav.style.display = 'flex';
            }
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
    
    // Navbar Shadow
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        else navbar.style.boxShadow = 'none';
    });
});