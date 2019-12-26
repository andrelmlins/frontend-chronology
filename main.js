fetch("./list.json")
  .then(resp => resp.json())
  .then(list => {
    const timeline = document.getElementById("timeline");
    const listOrder = list.sort(
      (a, b) => a.year - b.year || a.name.localeCompare(b.name)
    );

    listOrder.map((item, index) => {
      const side = index % 2 === 0 ? "left" : "right";

      const container = document.createElement("div");
      container.setAttribute("class", `container ${side}`);

      container.innerHTML = `
        <div class="content content-${side} js--fadeIn${side}" role="section">
          <div class="content-logo content-logo-${side}">
            <img
              class="logo"
              alt="${item.name}"
              src="${item.imageUrl}"
            />
          </div>
          <div class="content-body">
            <h3>${item.year} - <strong>${item.name}</strong></h3>
            <p>${item.description}</p>
            <a aria-label="Website" class="link" href="${item.website}" target="_blank">
              <i class="fa fa-link"></i>
            </a>
            <a aria-label="Github" class="link" href="${item.github}" target="_blank">
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      `;

      timeline.appendChild(container);
    });
  });

window.onload = () => {
  window.sr = ScrollReveal();

  if (window.innerWidth < 768) {
    sr.reveal(".js--fadeInleft", {
      origin: "right",
      distance: "100px",
      easing: "ease-in-out",
      duration: 800
    });

    sr.reveal(".js--fadeInright", {
      origin: "right",
      distance: "100px",
      easing: "ease-in-out",
      duration: 800
    });
  } else {
    sr.reveal(".js--fadeInleft", {
      origin: "left",
      distance: "200px",
      easing: "ease-in-out",
      duration: 800
    });

    sr.reveal(".js--fadeInright", {
      origin: "right",
      distance: "300px",
      easing: "ease-in-out",
      duration: 800
    });
  }
};
