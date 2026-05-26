(function () {
  "use strict";

  var ADMIN_PASSWORD = "5536161";
  var STORAGE_KEY = "zender_products";
  var CATEGORIES_STORAGE_KEY = "zender_custom_categories";
  var LANG_KEY = "zender_lang";
  var ADMIN_KEY = "zender_admin";

  var BRANDS = ["MSI", "Gigabyte", "ASUS", "Intel", "AMD", "Samsung", "Kingston", "Corsair", "LG", "Acer", "Lenovo", "HP"];

  var BUILTIN_CATEGORY_IDS = ["cpu", "ssd", "ram", "monitor", "gpu", "motherboard", "laptop", "other"];

  var DEFAULT_CATEGORIES = [
    { id: "cpu", key: "cat.cpu", builtin: true },
    { id: "ssd", key: "cat.ssd", builtin: true },
    { id: "ram", key: "cat.ram", builtin: true },
    { id: "monitor", key: "cat.monitor", builtin: true },
    { id: "gpu", key: "cat.gpu", builtin: true },
    { id: "motherboard", key: "cat.motherboard", builtin: true },
    { id: "laptop", key: "cat.laptop", builtin: true },
    { id: "other", key: "cat.other", builtin: true }
  ];

  var CYRILLIC_LATIN = {
    "\u0430": "a", "\u0431": "b", "\u0432": "v", "\u0433": "g", "\u0434": "d", "\u0435": "e", "\u0451": "yo",
    "\u0436": "zh", "\u0437": "z", "\u0438": "i", "\u0439": "y", "\u043a": "k", "\u043b": "l", "\u043c": "m",
    "\u043d": "n", "\u043e": "o", "\u043f": "p", "\u0440": "r", "\u0441": "s", "\u0442": "t", "\u0443": "u",
    "\u0444": "f", "\u0445": "h", "\u0446": "ts", "\u0447": "ch", "\u0448": "sh", "\u0449": "sh", "\u044a": "",
    "\u044b": "y", "\u044c": "", "\u044d": "e", "\u044e": "yu", "\u044f": "ya",
    "\u0401": "Yo", "\u0410": "A", "\u0411": "B", "\u0412": "V", "\u0413": "G", "\u0414": "D", "\u0415": "E",
    "\u0416": "Zh", "\u0417": "Z", "\u0418": "I", "\u0419": "Y", "\u041a": "K", "\u041b": "L", "\u041c": "M",
    "\u041d": "N", "\u041e": "O", "\u041f": "P", "\u0420": "R", "\u0421": "S", "\u0422": "T", "\u0423": "U",
    "\u0424": "F", "\u0425": "H", "\u0426": "Ts", "\u0427": "Ch", "\u0428": "Sh", "\u0429": "Sh", "\u042c": "",
    "\u042b": "Y", "\u042d": "E", "\u042e": "Yu", "\u042f": "Ya"
  };

  var PHRASE_TRANS = {
    "\u043f\u0440\u043e\u0446\u0435\u0441\u0441\u043e\u0440": { uz: "Protsessor", en: "Processor" },
    "\u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u0430\u044f \u043f\u0430\u043c\u044f\u0442\u044c": { uz: "Operativ xotira", en: "RAM" },
    "\u043e\u043f\u0435\u0440\u0430\u0442\u0438\u0432\u043d\u0430\u044f": { uz: "Operativ", en: "RAM" },
    "\u0432\u0438\u0434\u0435\u043e\u043a\u0430\u0440\u0442\u0430": { uz: "Videokarta", en: "Graphics card" },
    "\u0432\u0438\u0434\u0435\u043e\u043a\u0430\u0440\u0442\u044b": { uz: "Videokartalar", en: "Graphics cards" },
    "\u043c\u0430\u0442\u0435\u0440\u0438\u043d\u0441\u043a\u0430\u044f \u043f\u043b\u0430\u0442\u0430": { uz: "Ona plata", en: "Motherboard" },
    "\u043c\u043e\u043d\u0438\u0442\u043e\u0440": { uz: "Monitor", en: "Monitor" },
    "\u043c\u043e\u043d\u0438\u0442\u043e\u0440\u044b": { uz: "Monitorlar", en: "Monitors" },
    "\u043d\u043e\u0443\u0442\u0431\u0443\u043a": { uz: "Noutbuk", en: "Laptop" },
    "\u043d\u043e\u0443\u0442\u0431\u0443\u043a\u0438": { uz: "Noutbuklar", en: "Laptops" },
    "\u043d\u0430\u043a\u043e\u043f\u0438\u0442\u0435\u043b\u044c": { uz: "Xotira qurilmasi", en: "Storage drive" },
    "\u043a\u043b\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u0430": { uz: "Klaviatura", en: "Keyboard" },
    "\u043c\u044b\u0448\u044c": { uz: "Sichqoncha", en: "Mouse" },
    "\u043a\u043e\u043b\u043e\u043d\u043a\u0438": { uz: "Kolonkalar", en: "Speakers" },
    "\u043d\u0430\u0443\u0448\u043d\u0438\u043a\u0438": { uz: "Quloqchin", en: "Headphones" },
    "\u0431\u043b\u043e\u043a \u043f\u0438\u0442\u0430\u043d\u0438\u044f": { uz: "Quvvat bloki", en: "Power supply" },
    "\u043a\u043e\u0440\u043f\u0443\u0441": { uz: "Korpus", en: "PC case" },
    "\u043a\u0443\u043b\u0435\u0440": { uz: "Sovutgich", en: "Cooler" },
    "\u0434\u0440\u0443\u0433\u043e\u0435": { uz: "Boshqa", en: "Other" }
  };

  var I18N = {
    ru: {
      "nav.catalog": "Каталог",
      "nav.laptops": "Ноутбуки",
      "nav.admin": "Админ",
      "hero.eyebrow": "Магазин компьютерной техники",
      "hero.title": "Zender — всё для вашего ПК",
      "hero.lead": "Процессоры, SSD, память, мониторы и ноутбуки от ведущих брендов.",
      "search.placeholder": "Поиск по названию товара…",
      "filters.title": "Фильтры",
      "filters.reset": "Сбросить",
      "filters.price": "Цена",
      "filters.from": "от",
      "filters.to": "до",
      "filters.brand": "Бренд",
      "filters.category": "Категория",
      "catalog.title": "Каталог",
      "catalog.laptopsTitle": "Ноутбуки",
      "catalog.empty": "Товары не найдены. Измените фильтры или поиск.",
      "catalog.count": "{n} товаров",
      "catalog.countOne": "{n} товар",
      "footer.top": "Наверх",
      "admin.loginTitle": "Вход администратора",
      "admin.password": "Пароль",
      "admin.wrongPassword": "Неверный пароль",
      "admin.enter": "Войти",
      "admin.panelTitle": "Панель администратора",
      "admin.logout": "Выйти",
      "admin.addProduct": "Добавить товар",
      "admin.nameRu": "Название (RU)",
      "admin.nameUz": "Название (UZ)",
      "admin.nameEn": "Название (EN)",
      "admin.price": "Цена (сум)",
      "admin.brand": "Бренд",
      "admin.category": "Категория",
      "admin.imageUrl": "Ссылка на фото (необязательно)",
      "admin.addBtn": "Добавить",
      "admin.autoFillHint": "UZ и EN заполнятся автоматически",
      "admin.editProducts": "Редактировать товары",
      "admin.editTitle": "Редактировать товар",
      "admin.editBtn": "Изменить",
      "admin.cancel": "Отмена",
      "admin.categories": "Категории",
      "admin.addCategory": "Добавить категорию",
      "admin.updateCategory": "Сохранить категорию",
      "admin.catNameRu": "Название категории (RU)",
      "admin.catNameUz": "Название (UZ)",
      "admin.catNameEn": "Название (EN)",
      "admin.builtin": "системная",
      "admin.tableName": "Название",
      "admin.tablePrice": "Цена",
      "admin.tableActions": "Действия",
      "admin.save": "Сохранить",
      "admin.delete": "Удалить",
      "admin.added": "Товар добавлен",
      "admin.saved": "Изменения сохранены",
      "admin.deleted": "Товар удалён",
      "admin.categoryAdded": "Категория добавлена",
      "admin.categoryUpdated": "Категория обновлена",
      "admin.categoryDeleted": "Категория удалена",
      "admin.cannotDeleteCategory": "Нельзя удалить: есть товары в этой категории",
      "admin.saveError": "Ошибка сохранения. Откройте сайт через Chrome/Edge, не в режиме инкогнито",
      "product.noImage": "Фото скоро",
      "cat.cpu": "Процессор",
      "cat.ssd": "SSD",
      "cat.ram": "Оперативная память",
      "cat.monitor": "Монитор",
      "cat.gpu": "Видеокарта",
      "cat.motherboard": "Материнская плата",
      "cat.laptop": "Ноутбук",
      "cat.other": "Другое",
      "currency": "сум"
    },
    uz: {
      "nav.catalog": "Katalog",
      "nav.laptops": "Noutbuklar",
      "nav.admin": "Admin",
      "hero.eyebrow": "Kompyuter texnikasi do'koni",
      "hero.title": "Zender — kompyuteringiz uchun hamma narsa",
      "hero.lead": "Protsessorlar, SSD, xotira, monitorlar va noutbuklar — yetakchi brendlardan.",
      "search.placeholder": "Mahsulot nomi bo'yicha qidirish…",
      "filters.title": "Filtrlar",
      "filters.reset": "Tozalash",
      "filters.price": "Narx",
      "filters.from": "dan",
      "filters.to": "gacha",
      "filters.brand": "Brend",
      "filters.category": "Kategoriya",
      "catalog.title": "Katalog",
      "catalog.laptopsTitle": "Noutbuklar",
      "catalog.empty": "Mahsulot topilmadi. Filtrlarni yoki qidiruvni o'zgartiring.",
      "catalog.count": "{n} ta mahsulot",
      "catalog.countOne": "{n} ta mahsulot",
      "footer.top": "Yuqoriga",
      "admin.loginTitle": "Administrator kirishi",
      "admin.password": "Parol",
      "admin.wrongPassword": "Noto'g'ri parol",
      "admin.enter": "Kirish",
      "admin.panelTitle": "Administrator paneli",
      "admin.logout": "Chiqish",
      "admin.addProduct": "Mahsulot qo'shish",
      "admin.nameRu": "Nomi (RU)",
      "admin.nameUz": "Nomi (UZ)",
      "admin.nameEn": "Nomi (EN)",
      "admin.price": "Narx (so'm)",
      "admin.brand": "Brend",
      "admin.category": "Kategoriya",
      "admin.imageUrl": "Rasm havolasi (ixtiyoriy)",
      "admin.addBtn": "Qo'shish",
      "admin.autoFillHint": "UZ va EN avtomatik to'ldiriladi",
      "admin.editProducts": "Mahsulotlarni tahrirlash",
      "admin.editTitle": "Mahsulotni tahrirlash",
      "admin.editBtn": "O'zgartirish",
      "admin.cancel": "Bekor qilish",
      "admin.categories": "Kategoriyalar",
      "admin.addCategory": "Kategoriya qo'shish",
      "admin.updateCategory": "Kategoriyani saqlash",
      "admin.catNameRu": "Kategoriya nomi (RU)",
      "admin.catNameUz": "Nomi (UZ)",
      "admin.catNameEn": "Nomi (EN)",
      "admin.builtin": "tizim",
      "admin.tableName": "Nomi",
      "admin.tablePrice": "Narx",
      "admin.tableActions": "Amallar",
      "admin.save": "Saqlash",
      "admin.delete": "O'chirish",
      "admin.added": "Mahsulot qo'shildi",
      "admin.saved": "O'zgarishlar saqlandi",
      "admin.deleted": "Mahsulot o'chirildi",
      "admin.categoryAdded": "Kategoriya qo'shildi",
      "admin.categoryUpdated": "Kategoriya yangilandi",
      "admin.categoryDeleted": "Kategoriya o'chirildi",
      "admin.cannotDeleteCategory": "O'chirib bo'lmaydi: kategoriyada mahsulotlar bor",
      "admin.saveError": "Saqlash xatosi. Saytni Chrome/Edge orqali oching",
      "product.noImage": "Rasm tez orada",
      "cat.cpu": "Protsessor",
      "cat.ssd": "SSD",
      "cat.ram": "Operativ xotira",
      "cat.monitor": "Monitor",
      "cat.gpu": "Videokarta",
      "cat.motherboard": "Ona plata",
      "cat.laptop": "Noutbuk",
      "cat.other": "Boshqa",
      "currency": "so'm"
    },
    en: {
      "nav.catalog": "Catalog",
      "nav.laptops": "Laptops",
      "nav.admin": "Admin",
      "hero.eyebrow": "Computer hardware store",
      "hero.title": "Zender — everything for your PC",
      "hero.lead": "CPUs, SSDs, RAM, monitors and laptops from leading brands.",
      "search.placeholder": "Search by product name…",
      "filters.title": "Filters",
      "filters.reset": "Reset",
      "filters.price": "Price",
      "filters.from": "from",
      "filters.to": "to",
      "filters.brand": "Brand",
      "filters.category": "Category",
      "catalog.title": "Catalog",
      "catalog.laptopsTitle": "Laptops",
      "catalog.empty": "No products found. Try changing filters or search.",
      "catalog.count": "{n} products",
      "catalog.countOne": "{n} product",
      "footer.top": "Back to top",
      "admin.loginTitle": "Admin login",
      "admin.password": "Password",
      "admin.wrongPassword": "Wrong password",
      "admin.enter": "Sign in",
      "admin.panelTitle": "Admin panel",
      "admin.logout": "Log out",
      "admin.addProduct": "Add product",
      "admin.nameRu": "Name (RU)",
      "admin.nameUz": "Name (UZ)",
      "admin.nameEn": "Name (EN)",
      "admin.price": "Price (UZS)",
      "admin.brand": "Brand",
      "admin.category": "Category",
      "admin.imageUrl": "Image URL (optional)",
      "admin.addBtn": "Add",
      "admin.autoFillHint": "UZ and EN will fill automatically",
      "admin.editProducts": "Edit products",
      "admin.editTitle": "Edit product",
      "admin.editBtn": "Edit",
      "admin.cancel": "Cancel",
      "admin.categories": "Categories",
      "admin.addCategory": "Add category",
      "admin.updateCategory": "Save category",
      "admin.catNameRu": "Category name (RU)",
      "admin.catNameUz": "Name (UZ)",
      "admin.catNameEn": "Name (EN)",
      "admin.builtin": "built-in",
      "admin.tableName": "Name",
      "admin.tablePrice": "Price",
      "admin.tableActions": "Actions",
      "admin.save": "Save",
      "admin.delete": "Delete",
      "admin.added": "Product added",
      "admin.saved": "Changes saved",
      "admin.deleted": "Product deleted",
      "admin.categoryAdded": "Category added",
      "admin.categoryUpdated": "Category updated",
      "admin.categoryDeleted": "Category deleted",
      "admin.cannotDeleteCategory": "Cannot delete: products use this category",
      "admin.saveError": "Save failed. Open the site in Chrome/Edge (not incognito)",
      "product.noImage": "Photo soon",
      "cat.cpu": "Processor",
      "cat.ssd": "SSD",
      "cat.ram": "RAM",
      "cat.monitor": "Monitor",
      "cat.gpu": "Graphics card",
      "cat.motherboard": "Motherboard",
      "cat.laptop": "Laptop",
      "cat.other": "Other",
      "currency": "UZS"
    }
  };

  var DEFAULT_PRODUCTS = [
    { id: "p1", brand: "Intel", category: "cpu", price: 2890000, image: "", name: { ru: "Intel Core i5-13400F", uz: "Intel Core i5-13400F", en: "Intel Core i5-13400F" } },
    { id: "p2", brand: "AMD", category: "cpu", price: 3250000, image: "", name: { ru: "AMD Ryzen 5 7600", uz: "AMD Ryzen 5 7600", en: "AMD Ryzen 5 7600" } },
    { id: "p3", brand: "Samsung", category: "ssd", price: 890000, image: "", name: { ru: "Samsung 990 PRO 1TB NVMe", uz: "Samsung 990 PRO 1TB NVMe", en: "Samsung 990 PRO 1TB NVMe" } },
    { id: "p4", brand: "Kingston", category: "ssd", price: 520000, image: "", name: { ru: "Kingston NV2 500GB", uz: "Kingston NV2 500GB", en: "Kingston NV2 500GB" } },
    { id: "p5", brand: "Corsair", category: "ram", price: 650000, image: "", name: { ru: "Corsair Vengeance 16GB DDR5", uz: "Corsair Vengeance 16GB DDR5", en: "Corsair Vengeance 16GB DDR5" } },
    { id: "p6", brand: "Kingston", category: "ram", price: 480000, image: "", name: { ru: "Kingston Fury 16GB DDR4", uz: "Kingston Fury 16GB DDR4", en: "Kingston Fury 16GB DDR4" } },
    { id: "p7", brand: "LG", category: "monitor", price: 2100000, image: "", name: { ru: "LG UltraGear 27\" 144Hz", uz: "LG UltraGear 27\" 144Hz", en: "LG UltraGear 27\" 144Hz" } },
    { id: "p8", brand: "ASUS", category: "monitor", price: 1850000, image: "", name: { ru: "ASUS TUF Gaming 24\"", uz: "ASUS TUF Gaming 24\"", en: "ASUS TUF Gaming 24\"" } },
    { id: "p9", brand: "MSI", category: "gpu", price: 5200000, image: "", name: { ru: "MSI GeForce RTX 4060 Ventus", uz: "MSI GeForce RTX 4060 Ventus", en: "MSI GeForce RTX 4060 Ventus" } },
    { id: "p10", brand: "Gigabyte", category: "gpu", price: 4800000, image: "", name: { ru: "Gigabyte RTX 4060 Eagle", uz: "Gigabyte RTX 4060 Eagle", en: "Gigabyte RTX 4060 Eagle" } },
    { id: "p11", brand: "Gigabyte", category: "motherboard", price: 1200000, image: "", name: { ru: "Gigabyte B650M DS3H", uz: "Gigabyte B650M DS3H", en: "Gigabyte B650M DS3H" } },
    { id: "p12", brand: "ASUS", category: "motherboard", price: 1450000, image: "", name: { ru: "ASUS PRIME B760-PLUS", uz: "ASUS PRIME B760-PLUS", en: "ASUS PRIME B760-PLUS" } },
    { id: "l1", brand: "ASUS", category: "laptop", price: 8900000, image: "", name: { ru: "ASUS TUF Gaming A15", uz: "ASUS TUF Gaming A15", en: "ASUS TUF Gaming A15" } },
    { id: "l2", brand: "Lenovo", category: "laptop", price: 7200000, image: "", name: { ru: "Lenovo IdeaPad Gaming 3", uz: "Lenovo IdeaPad Gaming 3", en: "Lenovo IdeaPad Gaming 3" } },
    { id: "l3", brand: "MSI", category: "laptop", price: 11500000, image: "", name: { ru: "MSI Katana 15", uz: "MSI Katana 15", en: "MSI Katana 15" } },
    { id: "l4", brand: "Acer", category: "laptop", price: 6500000, image: "", name: { ru: "Acer Aspire 5", uz: "Acer Aspire 5", en: "Acer Aspire 5" } },
    { id: "l5", brand: "HP", category: "laptop", price: 9800000, image: "", name: { ru: "HP Victus 16", uz: "HP Victus 16", en: "HP Victus 16" } }
  ];

  var state = {
    lang: localStorage.getItem(LANG_KEY) || "ru",
    section: "catalog",
    search: "",
    brands: [],
    categories: [],
    priceMin: null,
    priceMax: null,
    products: [],
    customCategories: [],
    editingCategoryId: null
  };

  var els = {};

  function t(key, vars) {
    var dict = I18N[state.lang] || I18N.ru;
    var str = dict[key] != null ? dict[key] : (I18N.ru[key] || key);
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        str = str.replace("{" + k + "}", vars[k]);
      });
    }
    return str;
  }

  function normalizeProduct(p) {
    if (!p || !p.id) return null;
    return {
      id: String(p.id),
      brand: p.brand || "",
      category: p.category || "other",
      price: parseInt(p.price, 10) || 0,
      image: p.image || "",
      name: {
        ru: (p.name && p.name.ru) || "",
        uz: (p.name && p.name.uz) || (p.name && p.name.ru) || "",
        en: (p.name && p.name.en) || (p.name && p.name.ru) || ""
      }
    };
  }

  function loadProducts() {
    try {
      if (!window.localStorage) return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null && raw !== "") {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          var cleaned = parsed
            .map(normalizeProduct)
            .filter(function (p) { return p && p.id !== "l6"; });
          if (cleaned.length !== parsed.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
          }
          return cleaned;
        }
      }
    } catch (e) {
      console.warn("Zender: loadProducts", e);
    }
    var defaults = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    } catch (e2) { /* ignore */ }
    return defaults;
  }

  function saveProducts() {
    try {
      if (!window.localStorage) {
        flashMessage(t("admin.saveError"));
        return false;
      }
      var json = JSON.stringify(state.products);
      localStorage.setItem(STORAGE_KEY, json);
      if (localStorage.getItem(STORAGE_KEY) !== json) {
        throw new Error("storage readback failed");
      }
      return true;
    } catch (e) {
      console.error("Zender: saveProducts", e);
      flashMessage(t("admin.saveError"));
      return false;
    }
  }

  function replaceProduct(id, data) {
    var index = state.products.findIndex(function (x) { return x.id === id; });
    if (index === -1) return false;
    var next = state.products.slice();
    next[index] = normalizeProduct(Object.assign({ id: id }, data));
    state.products = next;
    return saveProducts();
  }

  function formatPrice(n) {
    return new Intl.NumberFormat(state.lang === "en" ? "en-US" : "ru-RU").format(n) + " " + t("currency");
  }

  function productName(p) {
    return (p.name && p.name[state.lang]) || p.name.ru || "";
  }

  function loadCustomCategories() {
    try {
      var raw = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return parsed.filter(function (c) {
            return c && c.id && c.label && BUILTIN_CATEGORY_IDS.indexOf(c.id) === -1;
          });
        }
      }
    } catch (e) { /* ignore */ }
    return [];
  }

  function saveCustomCategories() {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(state.customCategories));
      return true;
    } catch (e) {
      console.error("Zender: saveCustomCategories", e);
      flashMessage(t("admin.saveError"));
      return false;
    }
  }

  function getAllCategories() {
    return DEFAULT_CATEGORIES.concat(state.customCategories);
  }

  function getCategoryById(id) {
    return getAllCategories().find(function (c) { return c.id === id; });
  }

  function getCategoryLabel(cat, lang) {
    lang = lang || state.lang;
    if (cat.label) return cat.label[lang] || cat.label.ru || cat.id;
    if (cat.key) return t(cat.key);
    return cat.id;
  }

  function categoryLabel(id) {
    var cat = getCategoryById(id);
    return cat ? getCategoryLabel(cat) : id;
  }

  function cyrillicToLatin(text) {
    return String(text).split("").map(function (ch) {
      return CYRILLIC_LATIN[ch] != null ? CYRILLIC_LATIN[ch] : ch;
    }).join("");
  }

  function autoTranslateFromRu(ruText) {
    var trimmed = ruText.trim();
    if (!trimmed) return { uz: "", en: "" };
    var lower = trimmed.toLowerCase();
    if (PHRASE_TRANS[lower]) return PHRASE_TRANS[lower];
    if (!/[а-яё]/i.test(trimmed)) {
      return { uz: trimmed, en: trimmed };
    }
    var latin = cyrillicToLatin(trimmed);
    return { uz: latin, en: trimmed };
  }

  function markManual(input) {
    if (input) input.dataset.manual = "1";
  }

  function clearManual(inputs) {
    inputs.forEach(function (input) {
      if (input) {
        delete input.dataset.manual;
      }
    });
  }

  function syncAutoTranslate(ruInput, uzInput, enInput) {
    if (!ruInput || !uzInput || !enInput) return;
    var ru = ruInput.value;
    var tr = autoTranslateFromRu(ru);
    if (!uzInput.dataset.manual) uzInput.value = tr.uz;
    if (!enInput.dataset.manual) enInput.value = tr.en;
  }

  function setupAutoTranslate(ruInput, uzInput, enInput) {
    if (!ruInput || !uzInput || !enInput) return;
    ruInput.addEventListener("input", function () {
      syncAutoTranslate(ruInput, uzInput, enInput);
    });
    uzInput.addEventListener("focus", function () { markManual(uzInput); });
    enInput.addEventListener("focus", function () { markManual(enInput); });
    uzInput.addEventListener("input", function () { markManual(uzInput); });
    enInput.addEventListener("input", function () { markManual(enInput); });
  }

  function slugify(text) {
    var base = cyrillicToLatin(text).toLowerCase();
    var slug = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return slug || "cat-" + Date.now().toString(36);
  }

  function uid() {
    return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function uniqueCategoryId(base) {
    var id = slugify(base);
    var n = 1;
    var candidate = id;
    while (getCategoryById(candidate)) {
      candidate = id + "-" + n;
      n += 1;
    }
    return candidate;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === "uz" ? "uz" : state.lang === "en" ? "en" : "ru";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });

    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === state.lang);
    });

    populateAdminSelects();
    renderFilters();
    renderProducts();
    renderAdminTable();
    renderAdminCategories();
    updateCategoryFormMode();
  }

  function getFilteredProducts() {
    var list = state.products.slice();

    if (state.section === "laptops") {
      list = list.filter(function (p) { return p.category === "laptop"; });
    }

    if (state.search.trim()) {
      var q = state.search.trim().toLowerCase();
      list = list.filter(function (p) {
        return Object.keys(p.name).some(function (lang) {
          return p.name[lang].toLowerCase().indexOf(q) !== -1;
        });
      });
    }

    if (state.brands.length) {
      list = list.filter(function (p) { return state.brands.indexOf(p.brand) !== -1; });
    }

    if (state.categories.length) {
      list = list.filter(function (p) { return state.categories.indexOf(p.category) !== -1; });
    }

    if (state.priceMin != null && !isNaN(state.priceMin)) {
      list = list.filter(function (p) { return p.price >= state.priceMin; });
    }

    if (state.priceMax != null && !isNaN(state.priceMax)) {
      list = list.filter(function (p) { return p.price <= state.priceMax; });
    }

    return list;
  }

  function renderFilters() {
    var brandContainer = els.brandFilters;
    var catContainer = els.categoryFilters;
    if (!brandContainer || !catContainer) return;

    var usedBrands = {};
    var usedCats = {};
    state.products.forEach(function (p) {
      usedBrands[p.brand] = true;
      usedCats[p.category] = true;
    });

    brandContainer.innerHTML = BRANDS.filter(function (b) { return usedBrands[b]; }).map(function (brand) {
      var checked = state.brands.indexOf(brand) !== -1 ? " checked" : "";
      return '<label class="filter-check"><input type="checkbox" data-brand="' + brand + '"' + checked + "> " + brand + "</label>";
    }).join("");

    var allCats = getAllCategories();
    var catsToShow = state.section === "laptops"
      ? allCats.filter(function (c) { return c.id === "laptop"; })
      : allCats.filter(function (c) { return c.id !== "laptop" && usedCats[c.id]; });

    catContainer.innerHTML = catsToShow.map(function (cat) {
      var checked = state.categories.indexOf(cat.id) !== -1 ? " checked" : "";
      return '<label class="filter-check"><input type="checkbox" data-category="' + cat.id + '"' + checked + "> " + escapeHtml(getCategoryLabel(cat)) + "</label>";
    }).join("");

    brandContainer.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("change", onBrandFilterChange);
    });
    catContainer.querySelectorAll("input").forEach(function (input) {
      input.addEventListener("change", onCategoryFilterChange);
    });
  }

  function productCardHtml(p) {
    var name = productName(p);
    var imgBlock = p.image
      ? '<img class="product-card__image" src="' + escapeAttr(p.image) + '" alt="' + escapeAttr(name) + '" loading="lazy" decoding="async">'
      : '<div class="product-card__placeholder" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>' +
        "<span>" + t("product.noImage") + "</span></div>";

    return (
      '<article class="product-card" data-id="' + p.id + '">' +
        '<div class="product-card__image-wrap">' + imgBlock + "</div>" +
        '<div class="product-card__body">' +
          '<div class="product-card__meta">' +
            '<span class="product-card__tag">' + escapeHtml(categoryLabel(p.category)) + "</span>" +
            '<span class="product-card__tag product-card__tag--brand">' + escapeHtml(p.brand) + "</span>" +
          "</div>" +
          '<h3 class="product-card__name">' + escapeHtml(name) + "</h3>" +
          '<p class="product-card__price">' + formatPrice(p.price) + "</p>" +
        "</div>" +
      "</article>"
    );
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, "&#39;");
  }

  function renderProducts() {
    var list = getFilteredProducts();
    var titleKey = state.section === "laptops" ? "catalog.laptopsTitle" : "catalog.title";

    if (els.catalogTitle) els.catalogTitle.textContent = t(titleKey);

    if (els.productsCount) {
      var countStr = state.lang === "ru" && list.length % 10 === 1 && list.length % 100 !== 11
        ? t("catalog.countOne", { n: list.length })
        : t("catalog.count", { n: list.length });
      els.productsCount.textContent = countStr;
    }

    if (els.productsGrid) {
      els.productsGrid.innerHTML = list.map(productCardHtml).join("");
    }

    if (els.catalogEmpty) {
      els.catalogEmpty.hidden = list.length > 0;
    }
  }

  function populateAdminSelects() {
    var brandHtml = BRANDS.map(function (b) {
      return "<option value=\"" + b + "\">" + b + "</option>";
    }).join("");

    var catHtml = getAllCategories().map(function (c) {
      return "<option value=\"" + c.id + "\">" + escapeHtml(getCategoryLabel(c)) + "</option>";
    }).join("");

    [els.adminBrandSelect, els.adminEditBrand].forEach(function (sel) {
      if (sel) sel.innerHTML = brandHtml;
    });
    [els.adminCategorySelect, els.adminEditCategory].forEach(function (sel) {
      if (sel) sel.innerHTML = catHtml;
    });
  }

  function renderAdminTable() {
    if (!els.adminProductsBody) return;

    els.adminProductsBody.innerHTML = state.products.map(function (p) {
      return (
        "<tr data-id=\"" + p.id + "\">" +
          "<td>" + escapeHtml(productName(p)) + "<br><small style=\"color:var(--text-muted)\">" + escapeHtml(p.brand) + " · " + escapeHtml(categoryLabel(p.category)) + "</small></td>" +
          "<td>" + formatPrice(p.price) + "</td>" +
          "<td><div class=\"admin-table__actions\">" +
            "<button type=\"button\" class=\"btn btn--primary btn--sm admin-edit-btn\">" + t("admin.editBtn") + "</button>" +
            "<button type=\"button\" class=\"btn btn--danger btn--sm admin-delete-btn\">" + t("admin.delete") + "</button>" +
          "</div></td>" +
        "</tr>"
      );
    }).join("");

    els.adminProductsBody.querySelectorAll(".admin-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", onAdminEditOpen);
    });
    els.adminProductsBody.querySelectorAll(".admin-delete-btn").forEach(function (btn) {
      btn.addEventListener("click", onAdminDelete);
    });
  }

  function renderAdminCategories() {
    if (!els.adminCategoriesList) return;

    els.adminCategoriesList.innerHTML = getAllCategories().map(function (cat) {
      var isBuiltin = !!cat.builtin;
      var badge = isBuiltin ? '<span class="admin-cat-item__badge">' + t("admin.builtin") + "</span>" : "";
      var actions = isBuiltin
        ? ""
        : '<div class="admin-cat-item__actions">' +
            '<button type="button" class="btn btn--ghost btn--sm admin-cat-edit-btn" data-id="' + cat.id + '">' + t("admin.editBtn") + "</button>" +
            '<button type="button" class="btn btn--danger btn--sm admin-cat-delete-btn" data-id="' + cat.id + '">' + t("admin.delete") + "</button>" +
          "</div>";

      return (
        '<li class="admin-cat-item' + (isBuiltin ? " admin-cat-item--builtin" : "") + '" data-id="' + cat.id + '">' +
          '<div class="admin-cat-item__info">' +
            "<strong>" + escapeHtml(getCategoryLabel(cat)) + "</strong>" + badge +
            '<div class="admin-cat-item__id">' + escapeHtml(cat.id) + "</div>" +
          "</div>" +
          actions +
        "</li>"
      );
    }).join("");

    els.adminCategoriesList.querySelectorAll(".admin-cat-edit-btn").forEach(function (btn) {
      btn.addEventListener("click", onAdminCategoryEdit);
    });
    els.adminCategoriesList.querySelectorAll(".admin-cat-delete-btn").forEach(function (btn) {
      btn.addEventListener("click", onAdminCategoryDelete);
    });
  }

  function updateCategoryFormMode() {
    if (!els.adminCategoryForm || !els.adminCategorySubmit) return;
    var editing = !!state.editingCategoryId;
    els.adminCategorySubmit.textContent = t(editing ? "admin.updateCategory" : "admin.addCategory");
  }

  function resetCategoryForm() {
    state.editingCategoryId = null;
    if (els.adminCategoryForm) els.adminCategoryForm.reset();
    clearManual([els.adminCatNameUz, els.adminCatNameEn]);
    updateCategoryFormMode();
  }

  function resetFilters() {
    state.brands = [];
    state.categories = [];
    state.priceMin = null;
    state.priceMax = null;
    state.search = "";
    if (els.searchInput) els.searchInput.value = "";
    if (els.priceMin) els.priceMin.value = "";
    if (els.priceMax) els.priceMax.value = "";
    renderFilters();
    renderProducts();
  }

  function setSection(section) {
    state.section = section;
    document.querySelectorAll(".nav__link[data-section]").forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("data-section") === section);
    });
    if (section === "laptops") {
      state.categories = ["laptop"];
    } else if (state.categories.length === 1 && state.categories[0] === "laptop") {
      state.categories = [];
    }
    renderFilters();
    renderProducts();
  }

  function onBrandFilterChange() {
    state.brands = [];
    els.brandFilters.querySelectorAll("input:checked").forEach(function (input) {
      state.brands.push(input.getAttribute("data-brand"));
    });
    renderProducts();
  }

  function onCategoryFilterChange() {
    state.categories = [];
    els.categoryFilters.querySelectorAll("input:checked").forEach(function (input) {
      state.categories.push(input.getAttribute("data-category"));
    });
    renderProducts();
  }

  function isAdminLoggedIn() {
    return sessionStorage.getItem(ADMIN_KEY) === "1";
  }

  function setAdminLoggedIn(val) {
    if (val) sessionStorage.setItem(ADMIN_KEY, "1");
    else sessionStorage.removeItem(ADMIN_KEY);
  }

  function openAdmin() {
    if (isAdminLoggedIn()) {
      els.adminPanelModal.showModal();
      populateAdminSelects();
      renderAdminTable();
      renderAdminCategories();
    } else {
      els.adminLoginModal.showModal();
      els.adminPassword.value = "";
      els.adminLoginError.hidden = true;
    }
  }

  function onAdminLogin(e) {
    e.preventDefault();
    if (els.adminPassword.value === ADMIN_PASSWORD) {
      setAdminLoggedIn(true);
      els.adminLoginError.hidden = true;
      els.adminLoginModal.close();
      els.adminPanelModal.showModal();
      populateAdminSelects();
      renderAdminTable();
      renderAdminCategories();
    } else {
      els.adminLoginError.hidden = false;
    }
  }

  function onAdminAdd(e) {
    e.preventDefault();
    syncAutoTranslate(els.adminAddNameRu, els.adminAddNameUz, els.adminAddNameEn);
    var fd = new FormData(els.adminAddForm);
    var product = normalizeProduct({
      id: uid(),
      name: {
        ru: String(fd.get("nameRu") || "").trim(),
        uz: String(fd.get("nameUz") || "").trim(),
        en: String(fd.get("nameEn") || "").trim()
      },
      price: parseInt(fd.get("price"), 10) || 0,
      brand: fd.get("brand"),
      category: fd.get("category"),
      image: String(fd.get("image") || "").trim()
    });
    if (!product) return;
    state.products = [product].concat(state.products);
    if (!saveProducts()) return;
    els.adminAddForm.reset();
    clearManual([els.adminAddNameUz, els.adminAddNameEn]);
    renderFilters();
    renderProducts();
    renderAdminTable();
    flashMessage(t("admin.added"));
  }

  function onAdminEditOpen(e) {
    var row = e.target.closest("tr");
    var id = row.getAttribute("data-id");
    var p = state.products.find(function (x) { return x.id === id; });
    if (!p || !els.adminEditModal) return;

    els.adminEditId.value = p.id;
    els.adminEditNameRu.value = p.name.ru || "";
    els.adminEditNameUz.value = p.name.uz || "";
    els.adminEditNameEn.value = p.name.en || "";
    clearManual([els.adminEditNameUz, els.adminEditNameEn]);
    els.adminEditPrice.value = p.price;
    els.adminEditBrand.value = p.brand;
    els.adminEditCategory.value = p.category;
    els.adminEditImage.value = p.image || "";
    els.adminEditModal.showModal();
  }

  function onAdminEditSubmit(e) {
    if (e) e.preventDefault();

    clearManual([els.adminEditNameUz, els.adminEditNameEn]);
    syncAutoTranslate(els.adminEditNameRu, els.adminEditNameUz, els.adminEditNameEn);

    var id = els.adminEditId.value;
    if (!id) return;

    var ok = replaceProduct(id, {
      name: {
        ru: els.adminEditNameRu.value.trim(),
        uz: els.adminEditNameUz.value.trim(),
        en: els.adminEditNameEn.value.trim()
      },
      price: parseInt(els.adminEditPrice.value, 10) || 0,
      brand: els.adminEditBrand.value,
      category: els.adminEditCategory.value,
      image: els.adminEditImage.value.trim()
    });

    if (!ok) return;

    els.adminEditModal.close();
    renderFilters();
    renderProducts();
    renderAdminTable();
    flashMessage(t("admin.saved"));
  }

  function onAdminCategorySubmit(e) {
    e.preventDefault();
    syncAutoTranslate(els.adminCatNameRu, els.adminCatNameUz, els.adminCatNameEn);
    var ru = els.adminCatNameRu.value.trim();
    var uz = els.adminCatNameUz.value.trim();
    var en = els.adminCatNameEn.value.trim();
    if (!ru || !uz || !en) return;

    if (state.editingCategoryId) {
      var cat = state.customCategories.find(function (c) { return c.id === state.editingCategoryId; });
      if (cat) {
        cat.label = { ru: ru, uz: uz, en: en };
        saveCustomCategories();
        flashMessage(t("admin.categoryUpdated"));
      }
      resetCategoryForm();
    } else {
      var newId = uniqueCategoryId(ru);
      state.customCategories.push({
        id: newId,
        label: { ru: ru, uz: uz, en: en }
      });
      saveCustomCategories();
      flashMessage(t("admin.categoryAdded"));
      resetCategoryForm();
    }

    populateAdminSelects();
    renderFilters();
    renderAdminCategories();
    updateCategoryFormMode();
  }

  function onAdminCategoryEdit(e) {
    var id = e.target.getAttribute("data-id");
    var cat = state.customCategories.find(function (c) { return c.id === id; });
    if (!cat) return;

    state.editingCategoryId = id;
    els.adminCatNameRu.value = cat.label.ru || "";
    els.adminCatNameUz.value = cat.label.uz || "";
    els.adminCatNameEn.value = cat.label.en || "";
    clearManual([els.adminCatNameUz, els.adminCatNameEn]);
    updateCategoryFormMode();
    els.adminCatNameRu.focus();
  }

  function onAdminCategoryDelete(e) {
    var id = e.target.getAttribute("data-id");
    var inUse = state.products.some(function (p) { return p.category === id; });
    if (inUse) {
      flashMessage(t("admin.cannotDeleteCategory"));
      return;
    }
    state.customCategories = state.customCategories.filter(function (c) { return c.id !== id; });
    if (state.editingCategoryId === id) resetCategoryForm();
    saveCustomCategories();
    populateAdminSelects();
    renderFilters();
    renderAdminCategories();
    flashMessage(t("admin.categoryDeleted"));
  }

  function onAdminDelete(e) {
    var row = e.target.closest("tr");
    var id = row.getAttribute("data-id");
    state.products = state.products.filter(function (x) { return x.id !== id; });
    if (!saveProducts()) return;
    renderFilters();
    renderProducts();
    renderAdminTable();
    flashMessage(t("admin.deleted"));
  }

  function flashMessage(msg) {
    var existing = document.querySelector(".toast");
    if (existing) existing.remove();
    var toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = msg;
    toast.style.cssText = "position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);padding:0.75rem 1.25rem;background:linear-gradient(135deg,#0d9488,#3b82f6);color:#fff;font-weight:600;border-radius:99px;z-index:200;box-shadow:0 8px 32px rgba(15,23,42,0.2);font-family:var(--font);";
    document.body.appendChild(toast);
    setTimeout(function () { toast.remove(); }, 2500);
  }

  function bindEvents() {
    document.querySelectorAll(".lang-switch__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.lang = btn.getAttribute("data-lang");
        localStorage.setItem(LANG_KEY, state.lang);
        applyI18n();
      });
    });

    document.querySelectorAll(".nav__link[data-section]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        setSection(link.getAttribute("data-section"));
        if (window.matchMedia("(max-width: 900px)").matches && els.nav) {
          setNavOpen(false);
        }
      });
    });

    if (els.searchInput) {
      els.searchInput.addEventListener("input", function () {
        state.search = els.searchInput.value;
        renderProducts();
      });
    }

    if (els.priceMin) {
      els.priceMin.addEventListener("change", function () {
        state.priceMin = els.priceMin.value === "" ? null : parseInt(els.priceMin.value, 10);
        renderProducts();
      });
    }

    if (els.priceMax) {
      els.priceMax.addEventListener("change", function () {
        state.priceMax = els.priceMax.value === "" ? null : parseInt(els.priceMax.value, 10);
        renderProducts();
      });
    }

    if (els.filtersReset) {
      els.filtersReset.addEventListener("click", resetFilters);
    }

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey && e.altKey && (e.key === "1" || e.code === "Digit1")) {
        e.preventDefault();
        openAdmin();
      }
    });

    if (els.adminLoginForm) {
      els.adminLoginForm.addEventListener("submit", onAdminLogin);
    }

    if (els.adminAddForm) {
      els.adminAddForm.addEventListener("submit", onAdminAdd);
    }

    if (els.adminEditForm) {
      els.adminEditForm.addEventListener("submit", onAdminEditSubmit);
    }

    if (els.adminEditSaveBtn) {
      els.adminEditSaveBtn.addEventListener("click", onAdminEditSubmit);
    }

    if (els.adminCategoryForm) {
      els.adminCategoryForm.addEventListener("submit", onAdminCategorySubmit);
    }

    setupAutoTranslate(els.adminAddNameRu, els.adminAddNameUz, els.adminAddNameEn);
    setupAutoTranslate(els.adminEditNameRu, els.adminEditNameUz, els.adminEditNameEn);
    setupAutoTranslate(els.adminCatNameRu, els.adminCatNameUz, els.adminCatNameEn);

    if (els.adminLogout) {
      els.adminLogout.addEventListener("click", function () {
        setAdminLoggedIn(false);
        els.adminPanelModal.close();
      });
    }

    document.querySelectorAll("[data-close-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest("dialog").close();
      });
    });

    /* Mobile nav */
    if (els.navToggle && els.nav) {
      els.navToggle.addEventListener("click", function () {
        setNavOpen(!els.nav.classList.contains("is-open"));
      });
      els.nav.querySelectorAll("a, button").forEach(function (el) {
        el.addEventListener("click", function () {
          if (window.matchMedia("(max-width: 900px)").matches) setNavOpen(false);
        });
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) setNavOpen(false);
      });
    }

    if (els.header) {
      window.addEventListener("scroll", function () {
        els.header.classList.toggle("is-scrolled", window.scrollY > 8);
      }, { passive: true });
    }
  }

  function setNavOpen(open) {
    if (!els.nav || !els.navToggle) return;
    els.nav.classList.toggle("is-open", open);
    els.navToggle.classList.toggle("is-open", open);
    els.navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  function init() {
    els.header = document.querySelector(".header");
    els.nav = document.querySelector(".nav");
    els.navToggle = document.querySelector(".nav-toggle");
    els.searchInput = document.getElementById("search-input");
    els.brandFilters = document.getElementById("brand-filters");
    els.categoryFilters = document.getElementById("category-filters");
    els.priceMin = document.getElementById("price-min");
    els.priceMax = document.getElementById("price-max");
    els.filtersReset = document.getElementById("filters-reset");
    els.catalogTitle = document.getElementById("catalog-title");
    els.productsCount = document.getElementById("products-count");
    els.productsGrid = document.getElementById("products-grid");
    els.catalogEmpty = document.getElementById("catalog-empty");
    els.adminLoginModal = document.getElementById("admin-login-modal");
    els.adminPanelModal = document.getElementById("admin-panel-modal");
    els.adminLoginForm = document.getElementById("admin-login-form");
    els.adminPassword = document.getElementById("admin-password");
    els.adminLoginError = document.getElementById("admin-login-error");
    els.adminAddForm = document.getElementById("admin-add-form");
    els.adminAddNameRu = document.getElementById("admin-add-name-ru");
    els.adminAddNameUz = document.getElementById("admin-add-name-uz");
    els.adminAddNameEn = document.getElementById("admin-add-name-en");
    els.adminBrandSelect = document.getElementById("admin-brand-select");
    els.adminCategorySelect = document.getElementById("admin-category-select");
    els.adminProductsBody = document.getElementById("admin-products-body");
    els.adminCategoryForm = document.getElementById("admin-category-form");
    els.adminCategorySubmit = els.adminCategoryForm ? els.adminCategoryForm.querySelector('button[type="submit"]') : null;
    els.adminCatNameRu = document.getElementById("admin-cat-name-ru");
    els.adminCatNameUz = document.getElementById("admin-cat-name-uz");
    els.adminCatNameEn = document.getElementById("admin-cat-name-en");
    els.adminCategoriesList = document.getElementById("admin-categories-list");
    els.adminEditModal = document.getElementById("admin-edit-modal");
    els.adminEditForm = document.getElementById("admin-edit-form");
    els.adminEditId = document.getElementById("admin-edit-id");
    els.adminEditNameRu = document.getElementById("admin-edit-name-ru");
    els.adminEditNameUz = document.getElementById("admin-edit-name-uz");
    els.adminEditNameEn = document.getElementById("admin-edit-name-en");
    els.adminEditPrice = document.getElementById("admin-edit-price");
    els.adminEditBrand = document.getElementById("admin-edit-brand");
    els.adminEditCategory = document.getElementById("admin-edit-category");
    els.adminEditImage = document.getElementById("admin-edit-image");
    els.adminEditSaveBtn = document.getElementById("admin-edit-save");
    els.adminLogout = document.getElementById("admin-logout");

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    state.customCategories = loadCustomCategories();
    state.products = loadProducts();
    bindEvents();
    applyI18n();

    window.addEventListener("pageshow", function (ev) {
      if (ev.persisted) {
        state.products = loadProducts();
        state.customCategories = loadCustomCategories();
        renderFilters();
        renderProducts();
        renderAdminTable();
        renderAdminCategories();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
