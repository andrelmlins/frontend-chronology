let projects = [];

const showModal = name => {
  const project = projects.find(item => item.name === name);

  const packageName = project.npm.replace("https://www.npmjs.com/package/", "");

  const nameGithub = project.github.replace("https://github.com/", "");

  document.getElementById("modalProject").innerHTML += `
    <div class="modal-content" role="document">
      <span class="close" onclick="closeModal()">&times;</span>
      <h2 style="margin: 0">${project.name}</h2>
      <h4 style="margin: 0"><strong>Package name</strong>: ${packageName}</h4>
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
      <div style="display: flex">
        <a aria-label="Website" class="link" href="${project.website}" target="_blank">
          <i class="fas fa-globe"></i>
        </a>
        <a aria-label="Github" class="link" href="${project.github}" target="_blank">
          <i class="fab fa-github"></i>
        </a>
        <a aria-label="Github" class="link" href="${project.npm}" target="_blank">
          <i class="fab fa-npm"></i>
        </a>
      </div>
    </div>
  `;

  document.getElementById("modalProject").style.display = "flex";
};

const closeModal = () => {
  document.getElementById("modalProject").style.display = "none";
  document.getElementById("modalProject").innerHTML = "";
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
            <div style="display: flex">
              <button aria-label="More" class="link" onclick="showModal('${item.name}')">
                <i class="far fa-eye"></i>
              </button>
              <a aria-label="Website" class="link" href="${item.website}" target="_blank">
                <i class="fas fa-globe"></i>
              </a>
              <a aria-label="Github" class="link" href="${item.github}" target="_blank">
                <i class="fab fa-github"></i>
              </a>
              <a aria-label="Github" class="link" href="${item.npm}" target="_blank">
                <i class="fab fa-npm"></i>
              </a>
            </div>
          </div>
        </div>
      `;

        timeline.appendChild(container);
      });

      window.sr = ScrollReveal();

      if (window.innerWidth < 800) {
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
