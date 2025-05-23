"use strict";

const btnPrimary = document.querySelectorAll(`.btn-primary`);
const nav = document.querySelector(`.nav`);
const logo = document.querySelector(`.logo`);
const navLinkModal = document.querySelectorAll(`.nav-link-modal`);
const openModal = document.querySelector(`.open-modal`);
const closeModal = document.querySelector(`.close-modal`);
const modal = document.querySelector(`#modal`);
const section1 = document.querySelector(`#section-1`);
const modalLinks = document.querySelectorAll(`.nav-link-modal `);
const allSections = document.querySelectorAll(`.section`);
const header = document.querySelector(`.header`);
const arrows = document.querySelector(`.arrows`);
const apartment = document.querySelectorAll(`.apartment`);
const reviewArrows = document.querySelector(`.review-arrows`);
const review = document.querySelectorAll(`.review`);
const contactBtn = document.querySelector(`#contact-btn`);
const searchBtn = document.querySelector(`#search`);
const listBtn = document.querySelector(`#list`);
const subscribeBtn = document.querySelector(`#subscribe-btn`);
const addToFav = document.querySelectorAll(`.fa-heart `);
const getStarted = document.querySelector(`#get-started-btn`);
// Hover on primary button

btnPrimary.forEach((btn) =>
  btn.addEventListener(`mouseover`, function (e) {
    e.target.style.backgroundColor = `rgba(3, 46, 88, 1)`;
  })
);

btnPrimary.forEach((btn) =>
  btn.addEventListener(`mouseout`, function (e) {
    e.target.style.backgroundColor = `rgba(5, 68, 132, 1)`;
  })
);

// Navigation Opacity effect
const activeSection = function () {
  document.querySelector(`.nav-link`).classList.add(`nav-hover`);
};
activeSection();

// Mouseout and over
const mouseOnNav = function (e) {
  if (e.target.classList.contains(`nav-link`)) {
    const siblings = e.target.closest(`.nav`).querySelectorAll(`.nav-link`);
    if (siblings !== e.target) {
      siblings.forEach((nav) => {
        nav.style.opacity = this;
        nav.style.color = `rgba(54, 57, 57, 1)`;
      });
      logo.style.opacity = this;
      e.target.classList.add(`nav-hover`);
      e.target.style.opacity = `100%`;
      e.target.style.color = `rgba(5, 68, 132, 1)`;
      activeSection();
    }
  }
};
// mouseover
nav.addEventListener(`mouseover`, mouseOnNav.bind(`50%`));

// mousout
nav.addEventListener(`mouseout`, function (e) {
  if (e.target.classList.contains(`nav-link`)) {
    const siblings = e.target.closest(`.nav`).querySelectorAll(`.nav-link`);
    if (siblings !== e.target) {
      siblings.forEach((nav) => {
        nav.style.opacity = `100%`;
        nav.style.color = `rgba(54, 57, 57, 1)`;
      });
      logo.style.opacity = `100%`;
      e.target.classList.add(`nav-hover`);
      activeSection();
    }
  }
  e.target.classList.remove(`nav-hover`);
});

// The modal function
const closeUpModal = function (e) {
  modal.classList.add(`hidden`);

  // const modalContent = modal.querySelector(`.modal-content`);
  // modalContent.addEventListener(`animationend`, function () {
  //   // modal.classList.add(`modal-slide-out`);
  //   modalContent.classList.remove(`modal-slide-out`);
};

const openUpModal = function (e) {
  document.querySelector(`#modal`).scrollIntoView({ behavior: `smooth` });
  // reset animation
  modal.classList.remove(`hidden`);
  modal.classList.remove(`modal-slide-out`);
  modal.classList.remove(`modal-slide-out`);
  //
  modal.classList.add(`modal-slid-in`);
};

// implmnt the modal screen
closeModal.addEventListener(`click`, closeUpModal);
openModal.addEventListener(`click`, openUpModal);

//
// Smooth Scrolling to section
nav.addEventListener(`click`, function (e) {
  e.preventDefault();
  if (e.target.classList.contains(`nav-link`)) {
    document
      .querySelector(e.target.getAttribute(`href`))
      .scrollIntoView({ behavior: `smooth` });
  }
});
//
modal.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`nav-link-modal`)) {
    closeUpModal();
    document
      .querySelector(e.target.getAttribute(`href`))
      .scrollIntoView({ behavior: `smooth` });
  }
});

// Rvealing the sections when scrolling using the observer API
allSections.forEach((section) => section.classList.add(`section-hidden`));
const sectionReveal = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section-hidden`);
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.3,
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
});

//Implementing th sticky header when the intersection is after the headedr sction
nav.closest(`#navigation`);
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting)
    nav.closest(`#navigation`).classList.add(`sticky-nav-bar`);
  if (entry.isIntersecting)
    nav.closest(`#navigation`).classList.remove(`sticky-nav-bar`);
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `112px`,
});
headerObserver.observe(header);

// implementing the slider components with arrows and dots on screen
let curReview = 0;
const reviewNum = review.length - 1;
const moveReview = function (cur) {
  review.forEach(
    (review, i) => (review.style.transform = `translate(${200 * (i - cur)}%)`)
  );
};
moveReview(curReview);

const nextPreviousReview = function (
  curMaxReview,
  newCurReview,
  UpdateCurReview
) {
  if (curReview === curMaxReview) {
    curReview = newCurReview;
  } else {
    curReview = UpdateCurReview;
  }
  moveReview(curReview);
};
// Rightarrow
reviewArrows
  .querySelector(`.fa-arrow-right`)
  .addEventListener(`click`, function (e) {
    nextPreviousReview(reviewNum, 0, curReview + 1);
  });

// LeftArrow
reviewArrows
  .querySelector(`.fa-arrow-left`)
  .addEventListener(`click`, function (e) {
    nextPreviousReview(0, reviewNum, curReview - 1);
  });
// KeyRight
document.addEventListener(`keydown`, function (e) {
  if (e.key === `ArrowRight`) {
    nextPreviousReview(reviewNum, 0, curReview + 1);
  }
});
// KeyLeft
document.addEventListener(`keydown`, function (e) {
  if (e.key === `ArrowLeft`) {
    nextPreviousReview(0, reviewNum, curReview - 1);
  }
});

// The conatct BTN
contactBtn.addEventListener(`click`, function (e) {
  window.location.href = `tel:+2347012425718 `;
});

// Get stated listing
getStarted.addEventListener(`click`, function () {
  document
    .querySelector(`.list-apartment`)
    .scrollIntoView({ behavior: `smooth` });
});
/* Search house */

searchBtn.addEventListener(`click`, function (e) {
  const locationInput = document.querySelector(`#location`).value;
  const propertyInput = document.querySelector(`#property-type`).value;
  alert(
    `Thanks for checking our website, we'll notify you about ${propertyInput} in ${locationInput} through your email as soon as possible.`
  );
});
//Implmnting lazy loading with About Us, agents,  apartment and listd images
/* sign up */

//
/* get list property */
listBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  const getListProperty = document.querySelector(`#get-listed`).value;
  alert(
    `Cheers🥳🥳 Your Property "${getListProperty}" is now listed, Thanks for trusting us`
  );
});
/* Subsib toemail */
subscribeBtn.addEventListener(`click`, function () {
  if (document.querySelector(`#email`).value) {
    alert(`Subscribed`);
  } else {
    alert(`Kindly enter a valid email`);
  }
});

// Apartent logic
let curHiddenApartment = 0;

const hidePreviousCard = function () {
  if (curHiddenApartment === apartment.length - 2) {
    apartment.forEach((item, i) => {
      item.classList.remove(`hidden`);
      curHiddenApartment = 0;
    });
  } else {
    curHiddenApartment = curHiddenApartment + 1;
    document
      .querySelector(`.apartment-${curHiddenApartment}`)
      .classList.add(`hidden`);
  }
};

arrows
  .querySelector(`.fa-arrow-right`)
  .addEventListener(`click`, hidePreviousCard);
arrows
  .querySelector(`.fa-arrow-left`)
  .addEventListener(`click`, hidePreviousCard);

// Add to Favourite
addToFav.forEach((fav) =>
  fav.addEventListener(`click`, function (e) {
    e.target.classList.toggle(`fa`);
    e.target.previousElementSibling.classList.toggle(`hidden`);
  })
);
// And thats all
