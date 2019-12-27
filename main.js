let projects = [];

const showModal = name => {
  const project = projects.find(item => item.name === name);

  fetch(project.github.replace("github.com", "api.github.com/repos"))
    .then(resp => resp.json())
    .then(() => {
      const nameGithub = project.github.replace("https://github.com/", "");

      document.body.innerHTML += `
        <div id="modalProject" class="modal" role="alertdialog">
          <div class="modal-content" role="document">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2 style="margin: 0">${project.name}</h2>
            <div style="margin-top: 20px">
              <img alt="GitHub stars" src="https://img.shields.io/github/stars/${nameGithub}?style=social">
              <img alt="GitHub watchers" src="https://img.shields.io/github/watchers/${nameGithub}?style=social">
              <img alt="GitHub forks" src="https://img.shields.io/github/forks/${nameGithub}?style=social">
            </div>
            <div style="display:flex; margin: 20px 0px">
              <div class="modal-logo">
                <img
                  class="logo"
                  alt="${project.name}"
                  src="${project.imageUrl}"
                />
              </div>
              <p style="margin:0">${project.description}</p>
            </div>
            <a aria-label="Website" class="link" href="${project.website}" target="_blank">
              <i class="fa fa-link"></i>
            </a>
            <a aria-label="Github" class="link" href="${project.github}" target="_blank">
              <i class="fa fa-github"></i>
            </a>
          </div>
        </div>
      `;
    });
};

const closeModal = () => {
  document.body.removeChild(document.getElementById("modalProject"));
};

window.onload = () => {
  fetch("./list.json")
    .then(resp => resp.json())
    .then(list => {
      projects = list;
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
            <button aria-label="More" class="link" onclick="showModal('${item.name}')">
              <i class="fa fa-eye"></i>
            </button>
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

      window.sr = ScrollReveal();

      if (window.innerWidth < 500) {
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
    });
};
