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

## 🛠 **Kullanılan Teknolojiler**

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
