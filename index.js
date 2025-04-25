// backtotop
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
window.addEventListener("scroll", function () {
  var e = document.querySelector(".back-to-top");
  window.scrollY > 100 ? e.classList.add("show") : e.classList.remove("show");
});

// Customization section
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const carouselInner = document.querySelector("#Carousel-inner");
let leftValue = 0;

function getItemWidth() {
  const item = carouselInner.querySelector(".c-item");
  const gap = parseFloat(getComputedStyle(carouselInner).gap) || 0;
  return item.offsetWidth + gap;
}

function getMaxScroll() {
  const vp = carouselInner.parentElement.offsetWidth;
  return carouselInner.scrollWidth - vp + 30;
}

function updatePosition() {
  carouselInner.style.left = `${leftValue}px`;
}

prev.addEventListener("click", () => {
  if (leftValue < 0) {
    leftValue += getItemWidth();
    if (leftValue > 0) leftValue = 0;
    updatePosition();
  }
});

next.addEventListener("click", () => {
  const maxScroll = getMaxScroll();
  const newLeft = leftValue - getItemWidth();
  if (Math.abs(newLeft) <= maxScroll) {
    leftValue = newLeft;
  } else {
    leftValue = -maxScroll;
  }
  updatePosition();
});

window.addEventListener("resize", () => {
  leftValue = 0;
  updatePosition();
});

updatePosition();

// faq
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;

    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }

    // Close other open accordion items
    document.querySelectorAll(".accordion-header").forEach((otherButton) => {
      if (otherButton !== button) {
        otherButton.classList.remove("active");
        otherButton.nextElementSibling.style.maxHeight = 0;
      }
    });
  });
});

// modal container
const modalContainer = document.createElement("div");
modalContainer.id = "modalContainer";
document.body.appendChild(modalContainer);

document.querySelectorAll(".c-item").forEach((card) => {
  const title = card.querySelector(".card-title").innerText;
  const img = card.querySelector("img").getAttribute("src");
  const desc = card.querySelector(".card-text").innerText;
  const btn = card.querySelector(".learn_more_btn");

  btn.dataset.title = title;
  btn.dataset.img = img;
  btn.dataset.description = desc;
});

const specifications = `
<ul class="small mb-0 text-break">
  <li><strong>Size: </strong> Customized</li>
  <li><strong>Pattern: </strong> Customized</li>
  <li><strong>Material: </strong> Cotton / Bamboo / Supima / Mercerised / <br> Organic / Customized</li>
  <li><strong>Design: </strong> Customized</li>
  <li><strong>Printing: </strong> Customized</li>
  <li><strong>Style: </strong> Customized</li>
</ul>

  `;

document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("learn_more_btn")) {
    e.preventDefault();

    const btn = e.target;
    const title = btn.dataset.title;
    const img = btn.dataset.img;
    const desc = btn.dataset.description;

    const modalHTML = `
        <div class="modal fade" id="productModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered modal-lg ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body d-flex flex-column flex-lg-row  gap-4">
                <img src="${img}" alt="${title}" class="img-fluid col-sm-5 col-8 rounded-3" style=" object-fit: cover;">
                <div class="align-self-center">
                  <p class="text-muted">${desc}</p>
                  <h6 class="fw-bold mt-3">Specifications:</h6>
                  ${specifications}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    // Inject modal into the dynamically created modalContainer
    modalContainer.innerHTML = modalHTML;

    const modal = new bootstrap.Modal(document.getElementById("productModal"));
    modal.show();
  }
});
// banner_section 
document
  .querySelector(".banner_section .button1")
  .addEventListener("click", function () {
    const phoneNumber = "916374400705";
    const message = encodeURIComponent(
      "Hi, I'm interested in custom apparel consultation."
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  });
