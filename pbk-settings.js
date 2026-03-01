/* ── PBK Site Ayarları ── */
(function() {
  const FB_CONFIG = {
    apiKey:"AIzaSyBQsrZLTj4_TULmPbglm8HdKMsy0WyfsqA",
    authDomain:"pbkoleji.firebaseapp.com",
    projectId:"pbkoleji",
    storageBucket:"pbkoleji.firebasestorage.app",
    messagingSenderId:"438741962860",
    appId:"1:438741962860:web:be6f0d747df17c83c08849"
  };

  // Firebase modüllerini yükle ve ayarları çek
  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
    import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

    const db = getFirestore(initializeApp(${JSON.stringify(FB_CONFIG)}));

    try {
      const snap = await getDoc(doc(db,'ayarlar','site'));
      if (!snap.exists()) return;
      const s = snap.data();

      // Telefon
      if (s.tel) {
        document.querySelectorAll('[data-pbk="tel"]').forEach(el => {
          el.textContent = s.tel;
          if (el.tagName === 'A') el.href = 'tel:' + s.tel.replace(/\\s/g,'');
        });
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = 'tel:' + s.tel.replace(/\\s/g,'');
          el.textContent = s.tel;
        });
      }

      // E-posta
      if (s.email) {
        document.querySelectorAll('[data-pbk="email"]').forEach(el => {
          el.textContent = s.email;
          if (el.tagName === 'A') el.href = 'mailto:' + s.email;
        });
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = 'mailto:' + s.email;
          if (!el.querySelector('span')) el.textContent = s.email;
        });
      }

      // Adres
      if (s.adres) {
        document.querySelectorAll('[data-pbk="adres"]').forEach(el => el.textContent = s.adres);
      }

      // Instagram
      if (s.instagram) {
        document.querySelectorAll('a[href*="instagram.com"]').forEach(el => {
          el.href = 'https://www.instagram.com/' + s.instagram.replace('@','') + '/';
          if (el.textContent.startsWith('@')) el.textContent = s.instagram.startsWith('@') ? s.instagram : '@'+s.instagram;
        });
      }

      // Okul adı
      if (s.okulAdi) {
        document.querySelectorAll('[data-pbk="okul-adi"]').forEach(el => el.textContent = s.okulAdi);
      }

      // Kayıt bandı
      const kayitBand = document.querySelector('[data-pbk="kayit-bandi"]');
      if (kayitBand) kayitBand.style.display = s.kayitAcik ? '' : 'none';

      // Duyuru bandı
      const duyuruBand = document.querySelector('[data-pbk="duyuru-bandi"]');
      if (duyuruBand) {
        duyuruBand.style.display = s.duyuruAcik ? '' : 'none';
        if (s.duyuruTxt) {
          const txt = duyuruBand.querySelector('[data-pbk="duyuru-txt"]');
          if (txt) txt.textContent = s.duyuruTxt;
        }
      }

    } catch(e) {
      console.warn('PBK ayarlar yüklenemedi:', e);
    }
  `;
  document.head.appendChild(script);
})();
