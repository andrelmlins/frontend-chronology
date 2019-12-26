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
        <div class="content">
          <div class="content-logo">
            <img
              class="logo"
              src=${item.imageUrl}
            />
            </div>
            <div class="content-body">
              <h3>${item.year} - <strong>${item.name}</strong></h3>
              <p>${item.description}</p>
              <a class="link" href="${item.website}" target="_blank">
                <i class="fa fa-link"></i>
              </a>
              <a class="link" href="${item.github}" target="_blank">
                <i class="fa fa-github"></i>
              </a>
            </div>
        </div>
      `;

      timeline.appendChild(container);
    });
  });
