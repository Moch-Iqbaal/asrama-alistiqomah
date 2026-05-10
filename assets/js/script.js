AOS.init();
// Script buat update jam real-time
function updateTime() {
  const now = new Date();
  const timeString = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  document.getElementById("current-time").innerText = timeString;
}
setInterval(updateTime, 1000);
updateTime();

// script buat update hari
function updateDate() {
  const now = new Date();
  const dateString = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  document.getElementById("current-date").innerText = dateString;
}
setInterval(updateDate, 1000);
updateDate();

// SCRIPT FITUR SEARCHING
const input = document.getElementById("searchInput");
const datalist = document.getElementById("suggestions");
const form = document.getElementById("searchForm");

// Ambil elemen target pencarian
const targets = document.querySelectorAll(
  "h1, h2, h3, h4,h5,span, p, li, ul, a, .search-target"
);
const texts = [...new Set([...targets].map((el) => el.textContent.trim()))]; // hapus duplikat

// Autocomplete
input.addEventListener("input", () => {
  const val = input.value.toLowerCase();
  datalist.innerHTML = "";
  if (val.length < 2) return;

  const matches = texts
    .filter((text) => text.toLowerCase().includes(val))
    .slice(0, 5);
  matches.forEach((match) => {
    const option = document.createElement("option");
    option.value = match;
    datalist.appendChild(option);
  });
});

// Highlight semua hasil & scroll ke pertama
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const keyword = input.value.toLowerCase();
  let matches = [];

  // Hapus highlight lama
  targets.forEach((el) => (el.style.backgroundColor = "transparent"));

  // Cari semua yang cocok
  targets.forEach((el) => {
    if (el.textContent.toLowerCase().includes(keyword)) {
      matches.push(el);
    }
  });

  if (matches.length > 0) {
    matches.forEach((el) => (el.style.backgroundColor = "#ffff99"));

    // Scroll ke elemen pertama yang cocok
    matches[0].scrollIntoView({ behavior: "smooth", block: "center" });

    // Hapus highlight setelah 3 detik
    setTimeout(() => {
      matches.forEach((el) => (el.style.backgroundColor = "transparent"));
    }, 1500);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tidak ada hasil yang ditemukan!",
    });
  }
});

// script teks berjalan di atas bar
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("navbar-shrink");
  } else {
    navbar.classList.remove("navbar-shrink");
  }
});

window.addEventListener("scroll", function () {
  const fadeElements = document.querySelectorAll(".fade-in-up");
  fadeElements.forEach(function (el) {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
});

// script FAQ
var toggleButton = document.getElementById("toggleFormButton");
var formCollapse = document.getElementById("formPertanyaan");

toggleButton.addEventListener("click", function () {
  setTimeout(function () {
    if (formCollapse.classList.contains("show")) {
      document.getElementById("name").focus();
    }
  }, 500);
});

// script form calon santri
document
  .getElementById("daftarForm")
  .addEventListener("submit", function (event) {
    const inputs = this.querySelectorAll("input[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (!isValid) {
      event.preventDefault();
      alert("Mohon lengkapi semua data wajib!");
    }
  });

// script back to top
var scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollTopBtn.classList.add("show");
    scrollTopBtn.classList.remove("hide");
  } else {
    scrollTopBtn.classList.remove("show");
    scrollTopBtn.classList.add("hide");
  }
};

function scrollToTop() {
  window.scroll({ top: 135, behavior: "smooth" });
}

// script form calon santri
document
  .getElementById("daftarForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (this.checkValidity()) {
      kirimWA();
    } else {
      this.reportValidity();
    }
  });

function kirimWA() {
  const namaDepan = document.getElementById("namaDepan").value.trim();
  const namaBelakang = document.getElementById("namaBelakang").value.trim();
  const noHp = document.getElementById("noHp").value.trim();
  const alasan = document.getElementById("alasanMondok").value.trim();

  // Validasi custom
  if (namaDepan.length < 3) {
    sweetAlert.fire({
      icon: "error",
      title: "Oops...",
      text: "Nama Depan minimal 3 karakter.",
    });
    return;
  }

  if (namaBelakang.length < 3) {
    sweetAlert.fire({
      icon: "error",
      title: "Oops...",
      text: "Nama Belakang minimal 3 karakter.",
    });
    return;
  }

  if (noHp.length < 10) {
    sweetAlert.fire({
      icon: "error",
      title: "Oops...",
      text: "Nomor HP minimal 10 digit.",
    });
    return;
  }

  // Kalau lolos semua, baru kirim ke WA
  let pesan = `Assalamu'alaikum warahmatullahi wabarakatuh, Punten poro Kyai/Ibu Nyai ingkang kinurmatan,
  kulo minangka wali calon santri nyuwun ijin ndhaptaraken anak kulo mondok wonten ing Asrama Al-Istiqomah.
  Monggo kersanipun dipun waos data anak kulo kados makaten:\n
  *Nama Depan* : ${namaDepan}\n*Nama Belakang* : ${namaBelakang}\n*Nomor HP Wali Santri* : ${noHp}\n*Alasan Mondok* : ${alasan}.
  Manawi taksih wonten kekirangan data, kulo badhe ngubungi malih. Matur nuwun sanget dumateng panjenengan sedaya. Wassalamu’alaikum warahmatullahi wabarakatuh.`;

  const nomorTujuan = "6285224882823";
  window.open(
    `https://wa.me/${nomorTujuan}?text=${encodeURIComponent(pesan)}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  var myModal = new bootstrap.Modal(document.getElementById("psbModal"));
  myModal.show();
});
