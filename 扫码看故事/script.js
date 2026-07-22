const scrollButton = document.querySelector("[data-scroll-target]");
const revealItems = document.querySelectorAll(".reveal, .fade-image");
const storyPages = Array.from(document.querySelectorAll(".story-page"));
const prevStoryButton = document.getElementById("prevStory");
const nextStoryButton = document.getElementById("nextStory");
const storyCount = document.getElementById("storyCount");

let currentStoryIndex = 0;

function updateStory() {
  storyPages.forEach((page, index) => {
    page.classList.toggle("active", index === currentStoryIndex);
  });

  storyCount.textContent = `${currentStoryIndex + 1} / ${storyPages.length}`;
  prevStoryButton.disabled = currentStoryIndex === 0;
  nextStoryButton.disabled = currentStoryIndex === storyPages.length - 1;
}

scrollButton.addEventListener("click", () => {
  const target = document.querySelector(scrollButton.dataset.scrollTarget);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

prevStoryButton.addEventListener("click", () => {
  if (currentStoryIndex > 0) {
    currentStoryIndex -= 1;
    updateStory();
  }
});

nextStoryButton.addEventListener("click", () => {
  if (currentStoryIndex < storyPages.length - 1) {
    currentStoryIndex += 1;
    updateStory();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -30px 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));
updateStory();
