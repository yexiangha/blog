/* 主题切换：跟随 localStorage，缺省跟随系统 */
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.textContent = isDark ? "☀️" : "🌙";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  if (btn) btn.addEventListener("click", toggleTheme);
  updateToggleIcon();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* 首页文章列表：从 posts.json 渲染
   新增文章 = 在 posts/ 放一个 html + 在 posts.json 加一条记录 */
async function renderPostList() {
  const container = document.getElementById("post-list");
  if (!container) return;
  try {
    const res = await fetch("/posts.json");
    if (!res.ok) throw new Error("posts.json 加载失败");
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<p class="empty">还没有文章，敬请期待。</p>';
      return;
    }
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    container.innerHTML = posts
      .map(
        (p) => `
      <a class="post-card" href="${p.url}">
        <h2>${escapeHtml(p.title)}</h2>
        <div class="post-meta">${p.date}${p.tags ? " · " + p.tags.map(escapeHtml).join(" / ") : ""}</div>
        <p class="post-summary">${escapeHtml(p.summary || "")}</p>
      </a>`
      )
      .join("");
  } catch (err) {
    container.innerHTML = '<p class="empty">文章列表加载失败，请刷新重试。</p>';
    console.error(err);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
