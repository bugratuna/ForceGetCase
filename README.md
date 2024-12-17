# Kargo Teklif Yönetim Sistemi (Angular 18 + NG-ZORRO)

Bu proje, kargo şirketleri için teklif oluşturma ve teklifleri listeleme amacıyla geliştirilmiş bir Angular uygulamasıdır. Proje, **JSON Server** kullanarak sahte backend ile çalışır ve **NG-ZORRO** UI kütüphanesi ile geliştirilmiştir.

---

## 🚀 **Proje İşlevleri**

1. **Teklif Oluşturma Sayfası**:
  - Kullanıcılar, kargo detaylarını doldurarak teklif oluşturabilir.
  - Mode, hareket türü, ülke, şehir, paket tipi, birim seçenekleri gibi alanlar içermektedir.

2. **Teklif Listeleme Sayfası**:
  - Oluşturulan teklifleri tablo halinde görüntüler.

3. **Layout Yapısı**:
  - **Header**: Dil seçici (TR, ENG, DE) ve profil dropdown'u bulunur.
    - Profil dropdown altında **"Çıkış"** butonu ile kullanıcı oturumu sonlandırılır.
  - **Footer**: Sayfanın alt kısmında sabit bir footer bulunur.
  - **Ana Layout**: Header, footer ve sayfa içeriğini (main) düzenler.

---

## 🔧 **Kullanılan Teknolojiler**

- **Angular 18**: Frontend geliştirme için kullanıldı.
- **NG-ZORRO**: UI bileşen kütüphanesi (https://ng.ant.design/).
- **JSON Server**: Sahte backend için kullanıldı.

---

## 🔧 **Kurulum Adımları**

### 1. Projeyi Klonlayın

```bash
git clone <proje-repo-url>
cd <proje-klasoru>
```

### 2. Bağımlılıkları Kurun

```bash
npm install
```

### 3. JSON Server Kurulumu

Projenin backend ihtiyacını karşılamak için **JSON Server** kullanıyoruz. JSON Server'ı yüklemek için:

```bash
npm install -g json-server
```

### 4. JSON Server'ı Çalıştırma

**db.json** dosyasını kullanarak backend'i başlatın.

```bash
json-server --watch db.json --port 3000
```

- JSON Server artık `http://localhost:3000` adresinde çalışacaktır.
- Örnek API endpoint'leri:
  - Teklifleri Listeleme: `GET http://localhost:3000/offers`
  - Teklif Oluşturma: `POST http://localhost:3000/offers`

### 5. Angular Uygulamasını Çalıştırma

Angular uygulamasını başlatmak için:

```bash
ng serve
```

- Uygulamayı `http://localhost:4200` adresinden görüntüleyebilirsiniz.

---

## 📄 **Proje Yapısı**

```bash
src/
│-- app/
│   │-- layouts/          # Ana layout bileşenleri (Header, Footer, MainLayout)
│   │-- pages/            # Sayfa bileşenleri (Offer, OfferList, Login)
│   │-- services/         # API servisleri (OfferService)
│   │-- app.routes.ts     # Uygulama yönlendirmeleri
│   │-- app.config.ts     # Standalone yapılandırma
│
│-- assets/               # Proje varlıkları
│-- environments/         # Çevre yapılandırmaları
│-- main.ts               # Angular uygulama başlatma noktasi
│-- index.html            # Ana HTML dosyası
```

---

## 🌟 **Uygulama Kullanımı**

1. **Teklif Oluşturma**:
  - `Teklif Oluştur` sekmesine giderek kargo detaylarını doldurun ve yeni bir teklif oluşturun.

2. **Teklif Listeleme**:
  - `Teklif Listesi` sekmesine giderek mevcut teklifleri görüntüleyin.

3. **Dil Seçimi**:
  - Header'daki dil seçici aracılığıyla uygulamanın dilini değiştirin (TR, ENG, DE).

4. **Çıkış Yapma**:
  - Header'daki **Profil** dropdown menüsünden **Çıkış** seçeneğine tıklayarak oturumu kapatabilir ve login sayfasına yönlendirilebilirsiniz.

---

## 🎨 **Kullanılan Kütüphaneler**

- [Angular 18](https://angular.io/)
- [NG-ZORRO](https://ng.ant.design/)
- [JSON Server](https://www.npmjs.com/package/json-server)

---

## 🐞 **Geliştirici Notları**

- JSON Server ile sahte backend kullanıldığı için veriler **db.json** dosyasına kaydedilir.
- Sayfalar arasında geçiş yaparak oluşturduğunuz teklifleri hemen listeleyebilirsiniz.


---

**İyi Kodlamalar! 🚀**

