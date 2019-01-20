const tabs = document.querySelector("#tabs");
const tabsContent = tabs.querySelectorAll(
  ".tabs-content [data-tab-title],[data-tab-icon]"
);
const tabsNav = tabs.querySelector(".tabs-nav");
const tabsNavClone = tabsNav.cloneNode(true);
const tabsNavClone2 = tabsNav.cloneNode(true);
const tabsNavClone3 = tabsNav.cloneNode(true);
const li = tabsNav.querySelector("li");
tabsNav.removeChild(li);
const liCloneLI = tabsNavClone.querySelector("li");
const liCloneA = liCloneLI.querySelector("a");
liCloneA.classList.add("ui-tabs-active");
liCloneA.textContent = tabsContent[0].dataset.tabTitle;
liCloneA.classList.add(tabsContent[0].dataset.tabIcon);

tabsNav.appendChild(liCloneLI);
const liClone2 = tabsNavClone2.querySelector("li");
const liClone3 = tabsNavClone3.querySelector("li");
tabsNav.appendChild(liClone2);
tabsNav.appendChild(liClone3);
const liCloneA2 = liClone2.querySelector("a");
liCloneA2.textContent = tabsContent[1].dataset.tabTitle;
liCloneA2.classList.add(tabsContent[1].dataset.tabIcon);
const liCloneA3 = liClone3.querySelector("a");
liCloneA3.textContent = tabsContent[2].dataset.tabTitle;
liCloneA3.classList.add(tabsContent[2].dataset.tabIcon);

const btns = tabs.querySelectorAll(".tabs-nav li a");
for (const button of btns) {
  button.addEventListener("click", logEvent);
};

function logEvent(event) {
  tagName = event.target;
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.remove("ui-tabs-active");
    tabsContent[i].classList.add("hidden");
  }
  if (tagName === liCloneA) {
    tagName.classList.add("ui-tabs-active");
    tabsContent[0].classList.remove("hidden");
  } else if (tagName === liCloneA2) {
    tagName.classList.add("ui-tabs-active");
    tabsContent[1].classList.remove("hidden");
  } else {
    tagName.classList.add("ui-tabs-active");
    tabsContent[2].classList.remove("hidden");
  };
};
