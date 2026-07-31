const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");

function closeMobileNavigation() {
  menuButton?.setAttribute("aria-expanded", "false");
  if (mobileNav) mobileNav.hidden = true;
}

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  if (mobileNav) mobileNav.hidden = open;
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMobileNavigation();
});

const desktopNavigation = window.matchMedia("(min-width: 861px)");
desktopNavigation.addEventListener?.("change", (event) => {
  if (event.matches) closeMobileNavigation();
});

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const catalogue = document.querySelector("#image-catalogue");
const cards = catalogue ? Array.from(catalogue.querySelectorAll(".gallery-card")) : [];
const resultCount = document.querySelector("#result-count");
const emptyCatalogue = document.querySelector("#empty-catalogue");
const sortControl = document.querySelector("#catalogue-sort");
const resetFilters = document.querySelector("#reset-filters");
const activeFilters = { catalogue: "all", subject: "all" };

function updateCatalogue() {
  const matchingCards = cards.filter((card) => {
    const matchesCatalogue =
      activeFilters.catalogue === "all" ||
      card.dataset.catalogue === activeFilters.catalogue;
    const matchesSubject =
      activeFilters.subject === "all" ||
      card.dataset.subject === activeFilters.subject;
    card.hidden = !(matchesCatalogue && matchesSubject);
    return matchesCatalogue && matchesSubject;
  });

  const sortMode = sortControl?.value || "catalogue";
  const sortedCards = [...cards].sort((left, right) => {
    if (sortMode === "name") {
      return left.dataset.objectName.localeCompare(right.dataset.objectName, undefined, {
        numeric: true,
      });
    }
    return Number(left.dataset.catalogueRank) - Number(right.dataset.catalogueRank);
  });
  sortedCards.forEach((card) => catalogue?.append(card));

  if (resultCount) {
    resultCount.textContent = `${matchingCards.length} ${
      matchingCards.length === 1 ? "image" : "images"
    }`;
  }
  if (emptyCatalogue) emptyCatalogue.hidden = matchingCards.length !== 0;
}

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const filterType = group.dataset.filterGroup;
  group.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeFilters[filterType] = button.dataset.filter;
      group.querySelectorAll(".filter-button").forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      updateCatalogue();
    });
  });
});

sortControl?.addEventListener("change", updateCatalogue);
resetFilters?.addEventListener("click", () => {
  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const filterType = group.dataset.filterGroup;
    activeFilters[filterType] = "all";
    group.querySelectorAll(".filter-button").forEach((button) => {
      const active = button.dataset.filter === "all";
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  });
  if (sortControl) sortControl.value = "catalogue";
  updateCatalogue();
});

updateCatalogue();
