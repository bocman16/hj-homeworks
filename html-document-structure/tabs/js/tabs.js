const tabs = document.querySelector("#tabs");
const tabsContent = tabs.querySelectorAll(
  ".tabs-content [data-tab-title],[data-tab-icon]"
);
const tabsNav = tabs.querySelector(".tabs-nav");

for (let i = 0; i < tabsContent.length; i++) {
  const tabsNavClone = tabsNav.cloneNode(true);
  const liCloneLI = tabsNavClone.querySelector("li");
  const liCloneA = liCloneLI.querySelector("a");
  liCloneA.textContent = tabsContent[i].dataset.tabTitle;
  liCloneA.classList.add(tabsContent[i].dataset.tabIcon);
  tabsNav.appendChild(liCloneLI);
}
const li = tabsNav.querySelector("li");
tabsNav.removeChild(li);

const btns = tabs.querySelectorAll(".tabs-nav li a");
btns[0].classList.add("ui-tabs-active");
for (const button of btns) {
  button.addEventListener("click", logEvent);
};

function logEvent(event) {
  tagName = event.target;
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("ui-tabs-active");
    tabsContent[i].classList.add("hidden");
  }
  if (tagName === btns[0]) {
    tagName.classList.add("ui-tabs-active");
    tabsContent[0].classList.remove("hidden");
  } else if (tagName === btns[1]) {
    tagName.classList.add("ui-tabs-active");
    tabsContent[1].classList.remove("hidden");
  } else {
    tagName.classList.add("ui-tabs-active");
    tabsContent[2].classList.remove("hidden");
  };
};