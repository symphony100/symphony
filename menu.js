//menu.js

const menus = [
    { id: "game", title: "ゲーム", img: "img/game.png", link: "game/" },
    { id: "calc", title: "電卓", img: "img/calc.png", link: "calc/" },
    { id: "memo", title: "メモ帳", img: "img/memo.png", link: "memo/" },
    { id: "login", title: "ログイン", img: "img/login.png", link: "login/" },
    { id: "archive", title: "アーカイブ", img: "img/archive.png", link: "archive/" },
    { id: "contact", title: "お問い合わせ", img: "img/contact.png", link: "contact/" },
  ];

  const wrapper = document.getElementById("menuWrapper");
  let isSorting = false;
  let dragged = null;
  let isLinkDisabled = false;

  function saveOrder() {
    const ids = [...wrapper.children].map(el => el.dataset.id);
    localStorage.setItem("menu-order", JSON.stringify(ids));
  }

  function loadOrder() {
    const stored = localStorage.getItem("menu-order");
    if (!stored) return menus;
    const ids = JSON.parse(stored);
    return ids.map(id => menus.find(m => m.id === id)).filter(m => m);
  }

  function renderMenus() {
    wrapper.innerHTML = "";
    const orderedMenus = loadOrder();
    for (const m of orderedMenus) {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.dataset.id = m.id;

      const img = document.createElement("img");
      img.src = m.img;

      const title = document.createElement("div");
      title.className = "menu-card-title";
      title.textContent = m.title;

      const dots = document.createElement("div");
      dots.className = "options-button";
      dots.textContent = "︙";

      const menu = document.createElement("div");
      menu.className = "options-menu";

      const sortBtn = document.createElement("button");
      sortBtn.textContent = isSorting ? "並べ替え終了" : "並べ替え";
      sortBtn.onclick = (e) => {
        e.stopPropagation();
        isSorting = !isSorting;

        if (!isSorting) {
          disableLinksForTwoSeconds();
        } else {
          alert("並べ替えモードになりました。ドラッグで移動できます！");
        }

        renderMenus();
      };

      menu.appendChild(sortBtn);
      dots.onclick = (e) => {
        e.stopPropagation();
        document.querySelectorAll(".options-menu").forEach(m => m.style.display = "none");
        menu.style.display = "block";
      };

      card.appendChild(dots);
      card.appendChild(menu);
      card.appendChild(img);
      card.appendChild(title);

      card.onclick = () => {
        if (!isSorting && !isLinkDisabled) {
          location.href = m.link;
        }
      };

      card.draggable = true;
      card.addEventListener("dragstart", (e) => {
        if (isSorting) {
          dragged = card;
          card.classList.add("dragging");
        } else {
          e.preventDefault();
        }
      });

      card.addEventListener("dragend", () => {
        if (isSorting) {
          dragged = null;
          card.classList.remove("dragging");
          saveOrder();
        }
      });

      card.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!isSorting || !dragged) return;
        const after = getDragAfterElement(wrapper, e.clientX, e.clientY);
        if (after == null) {
          wrapper.appendChild(dragged);
        } else {
          wrapper.insertBefore(dragged, after);
        }
      });

      // タッチ操作対応
      card.addEventListener("touchstart", (e) => {
        if (!isSorting) return;
        dragged = card;
        card.classList.add("dragging");
      });

      card.addEventListener("touchmove", (e) => {
        if (!isSorting || !dragged) return;
        const touch = e.touches[0];
        const after = getDragAfterElement(wrapper, touch.clientX, touch.clientY);
        if (after == null) {
          wrapper.appendChild(dragged);
        } else {
          wrapper.insertBefore(dragged, after);
        }
      });

      card.addEventListener("touchend", () => {
        if (!isSorting || !dragged) return;
        dragged.classList.remove("dragging");
        dragged = null;
        saveOrder();
      });

      wrapper.appendChild(card);
    }
  }

  function getDragAfterElement(container, x, y) {
    const elements = [...container.querySelectorAll(".menu-card:not(.dragging)")];
    return elements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

  window.addEventListener("click", () => {
    document.querySelectorAll(".options-menu").forEach(m => m.style.display = "none");
  });

  window.addEventListener("load", () => {
    isSorting = false;
    renderMenus();
  });

  function disableLinksForTwoSeconds() {
    isLinkDisabled = true;
    setTimeout(() => {
      isLinkDisabled = false;
    }, 2000);
  }
