+(function() {
  const byId = document.getElementById.bind(document);

  const anchor = byId("link");
  const refreshBtn = byId("refresh");
  const showAllBtn = byId("show-all");
  const allLinks = byId("all-links");

  function refreshLink(links, event) {
    if (event) event.preventDefault();
    const { idx, linkObj } = getNewLink(links);
    if (idx > -1) {
      links.splice(idx, 1);
      if (links.length === 0) {
        refreshBtn.style.display = "none";
        showAllBtn.style.display = "inline-block";
      }
      anchor.innerHTML = linkObj.title;
      anchor.setAttribute("href", linkObj.link);
    }
  }

  function getNewLink(links) {
    const idx = getRandomIdx(links.length);
    return {
      idx,
      linkObj: links[idx]
    };
  }

  function getRandomIdx(limit) {
    return Math.floor(Math.random() * limit);
  }

  function showAllLinks(event) {
    allLinks.style.display = "block";
  }

  function getListItem(linkObj) {
    return `<li><a href="${linkObj.link}" target="_blank">${linkObj.title}</a></li>`;
  }

  function init() {
    let links = window.link.allLinks || [];
    refreshBtn.onclick = refreshLink.bind(null, links);
    showAllBtn.onclick = showAllLinks.bind(null);
    allLinks.innerHTML = links.map(getListItem).join("");

    refreshLink(links);
  }

  init();
})();
