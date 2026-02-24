// ========================================
// DATOS DE LA GALERÍA (simulando galeria.json)
// ========================================
const galeriaData = [
    { id: 1, titulo: "Salón principal", categoria: "interior", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
    { id: 2, titulo: "Dormitorio doble", categoria: "interior", url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800" },
    { id: 3, titulo: "Cocina equipada", categoria: "interior", url: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800" },
    { id: 4, titulo: "Vista montañas", categoria: "exterior", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" },
    { id: 5, titulo: "Jardín trasero", categoria: "exterior", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800" },
    { id: 6, titulo: "Piscina", categoria: "exterior", url: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800" },
    { id: 7, titulo: "Barbacoa", categoria: "servicios", url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" },
    { id: 8, titulo: "Zona relax", categoria: "servicios", url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800" },
    { id: 9, titulo: "Baño completo", categoria: "interior", url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800" },
    { id: 10, titulo: "Terraza", categoria: "exterior", url: "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800" },
    { id: 11, titulo: "Zona de juegos", categoria: "servicios", url: "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800" },
    { id: 12, titulo: "Chimenea", categoria: "interior", url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800" }
];

// ========================================
// DATOS DE DISPONIBILIDAD (simulando disponibilidad.json)
// ========================================
const disponibilidadData = {
    "2026-02-01": "libre",
    "2026-02-02": "libre",
    "2026-02-03": "ocupado",
    "2026-02-04": "ocupado",
    "2026-02-05": "libre",
    "2026-02-06": "libre",
    "2026-02-07": "libre",
    "2026-02-08": "ocupado",
    "2026-02-09": "libre",
    "2026-02-10": "libre",
    "2026-02-11": "libre",
    "2026-02-12": "ocupado",
    "2026-02-13": "ocupado",
    "2026-02-14": "ocupado",
    "2026-02-15": "libre",
    "2026-02-16": "libre",
    "2026-02-17": "libre",
    "2026-02-18": "libre",
    "2026-02-19": "ocupado",
    "2026-02-20": "libre",
    "2026-02-21": "libre",
    "2026-02-22": "ocupado",
    "2026-02-23": "libre",
    "2026-02-24": "libre",
    "2026-02-25": "libre",
    "2026-02-26": "ocupado",
    "2026-02-27": "ocupado",
    "2026-02-28": "libre"
};

// ========================================
// NAVEGACIÓN Y HEADER
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Cambiar header al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menú hamburguesa móvil
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Navegación suave y marcar sección activa
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Quitar clase active de todos
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Añadir clase active al clickeado
        link.classList.add('active');
        
        // Cerrar menú móvil
        navMenu.classList.remove('active');
        
        // Scroll suave a la sección
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// GALERÍA DINÁMICA
// ========================================
function cargarGaleria(categoria = 'todos') {
    const galeriaGrid = document.getElementById('galeriaGrid');
    galeriaGrid.innerHTML = '';
    
    const imagenesFiltradas = categoria === 'todos' 
        ? galeriaData 
        : galeriaData.filter(img => img.categoria === categoria);
    
    imagenesFiltradas.forEach(imagen => {
        const item = document.createElement('div');
        item.className = 'galeria-item';
        item.innerHTML = `
            <img src="${imagen.url}" alt="${imagen.titulo}" loading="lazy">
            <div class="galeria-overlay">
                <h3>${imagen.titulo}</h3>
            </div>
        `;
        galeriaGrid.appendChild(item);
    });
}

// Filtros de galería
const filtrosBtns = document.querySelectorAll('.filtro-btn');

filtrosBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Quitar active de todos
        filtrosBtns.forEach(b => b.classList.remove('active'));
        
        // Añadir active al clickeado
        btn.classList.add('active');
        
        // Filtrar galería
        const categoria = btn.getAttribute('data-filter');
        cargarGaleria(categoria);
    });
});

// Cargar galería al inicio
cargarGaleria();

// ========================================
// CALENDARIO DE RESERVAS
// ========================================
function generarCalendario() {
    const calendario = document.getElementById('calendario');
    
    // Días de la semana
    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    diasSemana.forEach(dia => {
        const diaElement = document.createElement('div');
        diaElement.className = 'dia-semana';
        diaElement.textContent = dia;
        calendario.appendChild(diaElement);
    });
    
    // Generar días del mes
    Object.entries(disponibilidadData).forEach(([fecha, estado]) => {
        const dia = parseInt(fecha.split('-')[2]);
        const diaElement = document.createElement('div');
        diaElement.className = `dia ${estado}`;
        diaElement.textContent = dia;
        diaElement.title = estado === 'libre' ? 'Disponible' : 'Ocupado';
        calendario.appendChild(diaElement);
    });
}

// Generar calendario al cargar
generarCalendario();

// ========================================
// ANIMACIONES AL HACER SCROLL
// ========================================
function animarAlScroll() {
    const elementos = document.querySelectorAll('.caracteristica-card, .galeria-item, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        observer.observe(elemento);
    });
}

// Iniciar animaciones
animarAlScroll();

// ========================================
// DETECCIÓN DE SECCIÓN ACTIVA AL SCROLL
// ========================================
function actualizarNavActivo() {
    const secciones = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop - 100;
            const seccionHeight = seccion.offsetHeight;
            const seccionId = seccion.getAttribute('id');
            
            if (scrollY > seccionTop && scrollY <= seccionTop + seccionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${seccionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

actualizarNavActivo();

// ========================================
// EFECTO PARALLAX EN HERO
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// CONSOLE LOG PARA DESARROLLADORES
// ========================================
console.log('%c🏡 Casa Rural JORCANVI', 'color: #2d7a3e; font-size: 20px; font-weight: bold;');
console.log('%cProyecto Intermodular 1º DAW', 'color: #666; font-size: 14px;');
console.log('%cIES Monte Naranco - 2026', 'color: #999; font-size: 12px;');
console.log('%c\n✅ Web cargada correctamente', 'color: #28a745; font-size: 14px;');
console.log(`📸 ${galeriaData.length} imágenes en galería`);
console.log(`📅 ${Object.keys(disponibilidadData).length} días de disponibilidad`);

// ========================================
// MENSAJE DE BIENVENIDA (opcional)
// ========================================
window.addEventListener('load', () => {
    console.log('\n🚀 Sistema iniciado correctamente');
    console.log('Todos los módulos cargados:');
    console.log('  ✓ Navegación responsive');
    console.log('  ✓ Galería dinámica con filtros');
    console.log('  ✓ Calendario de reservas');
    console.log('  ✓ Animaciones al scroll');
    console.log('  ✓ WhatsApp flotante');
    console.log('\n👨‍💻 Desarrollado por: Equipo JORCANVI Digital');
});