/* JavaScript, app.js, modern browsers, GETPLUS study workspace */
(() => {
  "use strict";

  const catalog = globalThis.GETPLUS_CATALOG;
  const sourceOrigin = "https://webapp.ft.education";
  const storageKey = "getplus-study-v1";
  const main = document.querySelector("#main");
  const dialog = document.querySelector("#search-dialog");
  const searchInput = document.querySelector("#search-input");
  const searchResults = document.querySelector("#search-results");
  const announcer = document.querySelector("#announcer");
  const lessonEntries = catalog.flatMap(course => course.lessons.map(lesson => ({ course, lesson })));
  const concise = new Intl.NumberFormat("en");
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => entities[char]);
  const subjectPath = course => `#courses/ebi/${course.id}`;
  const lessonPath = (course, lesson) => `${subjectPath(course)}/${lesson.id}`;
  const lessonKey = (course, lesson) => `${course.id}/${lesson.id}`;

  function readState() {
    try {
      const raw = JSON.parse(localStorage.getItem(storageKey) || "{}");
      return {
        completed: Array.isArray(raw?.completed) ? raw.completed.filter(value => typeof value === "string") : [],
        bookmarks: Array.isArray(raw?.bookmarks) ? raw.bookmarks.filter(value => typeof value === "string") : [],
        notes: raw?.notes && typeof raw.notes === "object" && !Array.isArray(raw.notes) ? raw.notes : {},
        tasks: Array.isArray(raw?.tasks) ? raw.tasks.filter(task => task && typeof task.id === "string" && typeof task.title === "string" && typeof task.date === "string") : [],
        last: typeof raw?.last === "string" ? raw.last : "",
      };
    } catch {
      return { completed: [], bookmarks: [], notes: {}, tasks: [], last: "" };
    }
  }

  let state = readState();
  let route = [];
  let disposePlayer;

  function save(message) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
      if (message) announcer.textContent = message;
    } catch {
      announcer.textContent = "Storage is unavailable. Changes are available for this visit.";
    }
  }

  function external(path, label, className = "") {
    return `<a class="${className}" href="${sourceOrigin}${path}" target="_blank" rel="noopener noreferrer">${label}<span class="sr-only"> (opens in a new tab)</span><span class="external-icon" aria-hidden="true">↗</span></a>`;
  }

  function crumb(parts) {
    return `<nav class="crumb" aria-label="Breadcrumb">${parts.map(([title, href]) =>
      href ? `<a href="${href}">${escape(title)}</a>` : `<span aria-current="page">${escape(title)}</span>`
    ).join('<span class="divider" aria-hidden="true">/</span>')}</nav>`;
  }

  function courseCards() {
    return `<div class="course-grid">${catalog.map(course => {
      const finished = course.lessons.filter(lesson => state.completed.includes(lessonKey(course, lesson))).length;
      return `<a class="subject-card tone-${course.color}" href="${subjectPath(course)}">
        <div class="subject-art"><img src="./assets/${course.art}" alt="" loading="lazy" width="540" height="380"><span lang="bn">${course.native}</span></div>
        <div class="subject-info"><div><span class="card-meta">${course.track}</span><h3>${course.name}</h3></div><span class="round-link" aria-hidden="true">↗</span></div>
        <div class="card-trailer">${finished ? `${finished} of ${course.lessons.length} lessons complete` : `${course.lessons.length} study lessons`}</div>
      </a>`;
    }).join("")}</div>`;
  }

  function home() {
    const resume = lessonEntries.find(({ course, lesson }) => lessonKey(course, lesson) === state.last);
    const action = resume ? `<a class="button subtle" href="${lessonPath(resume.course, resume.lesson)}">Resume your lesson</a>` : '<a class="button subtle" href="#books">Browse the books</a>';
    return `<div class="wrap home">
      <section class="hero" aria-labelledby="home-title">
        <div class="hero-copy"><p class="eyebrow"><i></i> HSC 2027 &amp; 2028</p>
          <h1 id="home-title">Make study<br>time <em>count.</em></h1>
          <p class="hero-description">Your workspace for Bangla, ICT and English. Pick a lesson, take notes and keep track of what you know.</p>
          <div class="button-row"><a class="button primary" href="#courses">Explore courses</a>${action}</div>
        </div>
        <figure class="hero-media"><img src="./assets/study-desk.webp" width="1200" height="800" alt="Open notebook and textbooks on a desk under a warm study light" fetchpriority="high"></figure>
      </section>
      <section class="band" aria-labelledby="subjects-title"><div class="section-heading"><div><p class="eyebrow">The course library</p><h2 id="subjects-title">Pick a subject.</h2></div><a class="text-link" href="#courses/ebi">Browse EBI 4.0</a></div>${courseCards()}</section>
      <section class="tool-grid" aria-label="Study tools">
        <a href="#books" class="tool-card"><span class="tool-icon book-icon" aria-hidden="true"></span><span><strong>Books</strong><small>Read, save and download study notes.</small></span><span class="round-link" aria-hidden="true">↗</span></a>
        <a href="#planner" class="tool-card"><span class="tool-icon calendar-icon" aria-hidden="true"></span><span><strong>Planner</strong><small>Schedule revision and track completed lessons.</small></span><span class="round-link" aria-hidden="true">↗</span></a>
      </section>
    </div>`;
  }

  function courses() {
    return `<div class="wrap inside">${crumb([["Home", "#home"], ["Courses"]])}
      <div class="page-heading"><p class="eyebrow">Course library</p><h1>Courses</h1><p>Open your HSC study collection and choose a subject.</p></div>
      <a class="collection" href="#courses/ebi">
        <div><p class="eyebrow">HSC 2027 &amp; 2028</p><h2>Fahad Tutorials<br><em>EBI 4.0</em></h2><p>Bangla, ICT and English</p><span class="button primary">Open collection</span></div>
        <div class="collection-art" aria-hidden="true"><i>E</i><i>B</i><i>I</i></div>
      </a>
      <p class="quiet-note">GETPLUS is an independent study companion. Official lessons open on the provider’s site.</p>
    </div>`;
  }

  function collection() {
    return `<div class="wrap inside">${crumb([["Home", "#home"], ["Courses", "#courses"], ["EBI 4.0"]])}
      <div class="page-heading"><p class="eyebrow">HSC 2027 &amp; 2028</p><h1>Fahad Tutorials <em>EBI 4.0</em></h1><p>Choose a subject to find GETPLUS practice lessons and links to your official chapters.</p></div>
      ${courseCards()}
      <div class="source-note"><div><strong>Looking for your enrolled classes?</strong><p>Open the official course catalog with your Fahad Tutorials account.</p></div>${external("/student/courses", "Official catalog", "button subtle")}</div>
    </div>`;
  }

  function subject(course) {
    return `<div class="wrap inside tone-${course.color}">
      ${crumb([["Courses", "#courses"], ["EBI 4.0", "#courses/ebi"], [course.name]])}
      <section class="subject-head"><div class="page-heading"><p class="eyebrow">${course.track}</p><h1>${course.name} <span lang="bn">${course.native}</span></h1><p>${course.description}</p></div><img src="./assets/${course.art}" alt="" width="540" height="380"></section>
      <section aria-labelledby="lessons-title" class="band subject-band"><div class="section-heading"><div><p class="eyebrow">GETPLUS practice</p><h2 id="lessons-title">Lessons</h2></div><span class="counter">${course.lessons.length} lessons</span></div>
        <ul class="lesson-list">${course.lessons.map((lesson, index) => {
          const complete = state.completed.includes(lessonKey(course, lesson));
          return `<li><a href="${lessonPath(course, lesson)}"><span class="lesson-number">${String(index + 1).padStart(2, "0")}</span><span class="lesson-title"><strong>${lesson.title}</strong><small>${lesson.summary}</small></span>${complete ? '<span class="status done">Complete</span>' : '<span class="status">Video + quiz</span>'}<span class="round-link" aria-hidden="true">↗</span></a></li>`;
        }).join("")}</ul>
      </section>
      <section class="band official" aria-labelledby="official-title"><div class="section-heading"><div><p class="eyebrow">Fahad Tutorials</p><h2 id="official-title">Official chapters</h2></div>${external(course.source, "Open official course", "text-link")}</div>
        <div class="official-list">${course.sections.map(section => section.chapters ? `<details><summary>${section.name}<span>${section.chapters.length} chapters</span></summary><ul>${section.chapters.map(([title, path]) => `<li>${external(path, escape(title))}</li>`).join("")}</ul></details>` : `<div class="official-row">${external(section.url, section.name)}</div>`).join("")}</div>
      </section>
    </div>`;
  }

  function lessonPage(course, lesson) {
    const key = lessonKey(course, lesson);
    const complete = state.completed.includes(key);
    const next = course.lessons[course.lessons.indexOf(lesson) + 1];
    const buttons = `${next ? `<a class="button subtle" href="${lessonPath(course, next)}">Next lesson</a>` : `<a class="button subtle" href="${subjectPath(course)}">Back to ${course.name}</a>`}`;
    return `<div class="wrap inside tone-${course.color}">
      ${crumb([["EBI 4.0", "#courses/ebi"], [course.name, subjectPath(course)], ["Lesson"]])}
      <div class="page-heading lesson-heading"><p class="eyebrow">${course.name} · GETPLUS practice</p><h1>${lesson.title}</h1><p>${lesson.summary}</p></div>
      <div class="lesson-layout">
        <div>
          <video class="player" controls playsinline preload="metadata" poster="./assets/${course.art}" aria-label="${lesson.title}" data-clip="./assets/video/${lesson.video}">
            <track kind="captions" src="./assets/video/${lesson.video.replace(".mp4", ".vtt")}" srclang="en" label="English">
            <a href="./assets/video/${lesson.video}">Open MP4 lesson</a>
          </video>
          <p class="video-error" id="video-error" hidden>Playback is unavailable in this browser. <a href="./assets/video/${lesson.video}">Open the MP4</a> or use the lesson notes below.</p>
          <div class="button-row lesson-actions"><button type="button" class="button primary" id="complete-lesson" aria-pressed="${complete}">${complete ? "Completed" : "Mark complete"}</button>${buttons}</div>
          <section class="lesson-copy" aria-labelledby="lesson-notes"><h2 id="lesson-notes">Lesson notes</h2><ol>${lesson.steps.map(step => `<li>${step}</li>`).join("")}</ol><h3>Worked example</h3><p>${lesson.example}</p></section>
          <form class="quiz" id="quiz"><fieldset><legend>Quick check</legend><p>${lesson.question}</p>
            ${lesson.choices.map((choice, index) => `<label class="choice"><input type="radio" name="answer" value="${index}" required><span>${choice}</span></label>`).join("")}
          </fieldset><button class="button subtle" type="submit">Check answer</button><p class="quiz-result" id="quiz-result" role="status"></p></form>
        </div>
        <aside><section class="note-panel"><h2>Your notes</h2><label class="sr-only" for="personal-notes">Your lesson notes</label><textarea id="personal-notes" maxlength="8000" placeholder="Write a reminder, question or example…">${escape(state.notes[key])}</textarea><p>Saved on this device.</p><a class="text-link" href="#books/${course.id}">Read the study book</a></section>
          <section class="note-panel"><h2>${course.name} lessons</h2><ul class="mini-list">${course.lessons.map(item => `<li><a href="${lessonPath(course, item)}"${item === lesson ? ' aria-current="page"' : ""}>${item.title}</a></li>`).join("")}</ul></section></aside>
      </div>
    </div>`;
  }

  function books() {
    return `<div class="wrap inside">${crumb([["Home", "#home"], ["Books"]])}
      <div class="page-heading"><p class="eyebrow">Reading room</p><h1>Books</h1><p>Short revision books with worked examples. Read online, save a bookmark or download the notes.</p></div>
      <div class="course-grid">${catalog.map(course => `<a class="subject-card tone-${course.color}" href="#books/${course.id}"><div class="subject-art book-art"><img src="./assets/${course.art}" alt="" width="540" height="380"><span class="book-label">${course.name} <em>notes</em></span></div><div class="subject-info"><div><span class="card-meta">Revision book</span><h3>${course.name} study notes</h3></div><span class="round-link" aria-hidden="true">↗</span></div><div class="card-trailer">${state.bookmarks.includes(course.id) ? "Bookmarked" : `${course.lessons.length} topics`}</div></a>`).join("")}</div>
    </div>`;
  }

  function book(course) {
    const saved = state.bookmarks.includes(course.id);
    return `<div class="wrap inside tone-${course.color}">${crumb([["Home", "#home"], ["Books", "#books"], [course.name]])}
      <div class="page-heading"><p class="eyebrow">GETPLUS revision book</p><h1>${course.name} study notes</h1><p>${course.description}</p></div>
      <div class="button-row"><button id="bookmark" class="button primary" type="button" aria-pressed="${saved}">${saved ? "Bookmarked" : "Bookmark book"}</button><button id="download-book" class="button subtle" type="button">Download notes</button></div>
      <div class="reading">${course.lessons.map(lesson => `<article><h2>${lesson.title}</h2><p>${lesson.summary}</p><ol>${lesson.steps.map(step => `<li>${step}</li>`).join("")}</ol><p><strong>Example.</strong> ${lesson.example}</p><a class="text-link" href="${lessonPath(course, lesson)}">Watch and practice</a></article>`).join("")}</div>
    </div>`;
  }

  function formatDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";
    const date = new Date(`${value}T00:00:00Z`);
    return Number.isNaN(date.valueOf()) ? "" : new Intl.DateTimeFormat("en", { month: "short", day: "numeric", timeZone: "UTC" }).format(date);
  }

  function planner() {
    const validProgress = lessonEntries.filter(({ course, lesson }) => state.completed.includes(lessonKey(course, lesson))).length;
    const tasks = [...state.tasks].sort((first, second) => Number(Boolean(first.done)) - Number(Boolean(second.done)) || (first.date || "9999").localeCompare(second.date || "9999"));
    return `<div class="wrap inside">${crumb([["Home", "#home"], ["Planner"]])}
      <div class="page-heading"><p class="eyebrow">Study planning</p><h1>Planner</h1><p>Set a revision task, check it off and see how far you’ve come.</p></div>
      <div class="planner-layout"><section class="plan-card" aria-labelledby="task-heading"><h2 id="task-heading">Your tasks</h2>
        <form id="add-task"><div class="task-field"><label for="task-title">Study task</label><input type="text" id="task-title" name="title" required maxlength="120" placeholder="Revise binary conversion"></div><div class="task-field"><label for="task-date">Date (optional)</label><input type="date" name="date" id="task-date"></div><button class="button primary" type="submit">Add task</button></form>
        <ul class="task-list">${tasks.length ? tasks.map(task => `<li><label><input type="checkbox" data-task-toggle="${escape(task.id)}" ${task.done ? "checked" : ""}><span>${escape(task.title)}${task.date ? `<small>${formatDate(task.date)}</small>` : ""}</span></label><button type="button" class="quiet-button" data-task-remove="${escape(task.id)}" aria-label="Remove task ${escape(task.title)}">Remove</button></li>`).join("") : "<li class='empty'>No tasks yet. Add your next study session above.</li>"}</ul>
      </section><section class="plan-card progress-card"><h2>Lesson progress</h2><p class="progress-count">${concise.format(validProgress)}<span> / ${lessonEntries.length}</span></p><progress value="${validProgress}" max="${lessonEntries.length}" aria-label="Lessons completed"></progress><p>Lessons completed</p><a class="text-link" href="#courses/ebi">Open subjects</a></section></div>
    </div>`;
  }

  function missing() {
    return '<div class="wrap inside"><div class="page-heading"><h1>Page unavailable</h1><p>Open the course library to find a subject or lesson.</p><a class="button primary" href="#courses">Open courses</a></div></div>';
  }

  function preparePlayer(video) {
    const errorMessage = document.querySelector("#video-error");
    const clip = video.dataset.clip;
    const controller = new AbortController();
    let clipUrl;
    video.addEventListener("error", () => { errorMessage.hidden = false; });
    if (location.protocol === "file:") {
      video.src = clip;
    } else {
      // The bundled clips are small. A blob keeps them seekable on static hosts
      // that serve the entire file in response to a byte-range request.
      fetch(clip, { signal: controller.signal }).then(response => {
        if (!response.ok) throw new Error("Lesson video unavailable");
        return response.blob();
      }).then(media => {
        if (controller.signal.aborted) return;
        clipUrl = URL.createObjectURL(media);
        video.src = clipUrl;
      }).catch(() => {
        if (!controller.signal.aborted) video.src = clip;
      });
    }
    return () => {
      controller.abort();
      if (clipUrl) URL.revokeObjectURL(clipUrl);
    };
  }

  function render({ focus = false } = {}) {
    if (location.hash === "#main") return;
    route = (location.hash.slice(1) || "home").split("/");
    const [section, group, subjectId, lessonId] = route;
    const course = catalog.find(item => item.id === (section === "books" ? group : subjectId));
    const lesson = course?.lessons.find(item => item.id === lessonId);
    let html = missing();
    if (section === "home" && route.length === 1) html = home();
    if (section === "courses" && route.length === 1) html = courses();
    if (section === "courses" && group === "ebi" && route.length === 2) html = collection();
    if (section === "courses" && group === "ebi" && course && route.length === 3) html = subject(course);
    if (section === "courses" && group === "ebi" && lesson && route.length === 4) {
      html = lessonPage(course, lesson);
      state.last = lessonKey(course, lesson);
      save();
    }
    if (section === "books" && route.length === 1) html = books();
    if (section === "books" && course && route.length === 2) html = book(course);
    if (section === "planner" && route.length === 1) html = planner();
    disposePlayer?.();
    main.innerHTML = html;
    const video = main.querySelector("video");
    disposePlayer = video ? preparePlayer(video) : undefined;
    document.title = section === "home" ? "GETPLUS — HSC Study Workspace" : `${main.querySelector("h1")?.textContent.trim() || "GETPLUS"} — GETPLUS`;
    document.querySelectorAll("[data-nav]").forEach(link => {
      if (link.dataset.nav === section) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    if (focus) {
      scrollTo(0, 0);
      main.focus({ preventScroll: true });
    }
  }

  function downloadBook(course) {
    const content = [`# ${course.name} study notes`, "GETPLUS · HSC 2027 & 2028",
      ...course.lessons.flatMap(lesson => [`## ${lesson.title}`, lesson.summary,
        lesson.steps.map((step, i) => `${i + 1}. ${step}`).join("\n"), `Example: ${lesson.example}`])
    ].join("\n\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
    const file = document.createElement("a");
    file.href = url;
    file.download = `getplus-${course.id}-notes.md`;
    file.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  main.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    const [section, group, subjectId, lessonId] = route;
    const course = catalog.find(item => item.id === (section === "books" ? group : subjectId));
    const lesson = course?.lessons.find(item => item.id === lessonId);
    if (button.id === "complete-lesson" && lesson) {
      const key = lessonKey(course, lesson);
      const complete = state.completed.includes(key);
      state.completed = complete ? state.completed.filter(item => item !== key) : [...state.completed, key];
      button.setAttribute("aria-pressed", String(!complete));
      button.textContent = complete ? "Mark complete" : "Completed";
      save(complete ? "Lesson marked incomplete." : "Lesson completed.");
    }
    if (button.id === "bookmark" && course) {
      const saved = state.bookmarks.includes(course.id);
      state.bookmarks = saved ? state.bookmarks.filter(item => item !== course.id) : [...state.bookmarks, course.id];
      button.setAttribute("aria-pressed", String(!saved));
      button.textContent = saved ? "Bookmark book" : "Bookmarked";
      save(saved ? "Bookmark removed." : "Book bookmarked.");
    }
    if (button.id === "download-book" && course) downloadBook(course);
    if (button.dataset.taskRemove) {
      state.tasks = state.tasks.filter(task => task.id !== button.dataset.taskRemove);
      save("Study task removed.");
      render();
      document.querySelector("#task-title").focus();
    }
  });

  main.addEventListener("submit", event => {
    const form = event.target;
    if (form.id === "add-task") {
      event.preventDefault();
      const fields = new FormData(form);
      const title = String(fields.get("title")).trim();
      if (!title) {
        form.querySelector("#task-title").focus();
        announcer.textContent = "Enter a task name.";
        return;
      }
      const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      state.tasks.push({ id, title, date: String(fields.get("date")), done: false });
      save("Study task added.");
      render();
      document.querySelector("#task-title").focus();
    }
    if (form.id === "quiz") {
      event.preventDefault();
      const lesson = catalog.find(item => item.id === route[2])?.lessons.find(item => item.id === route[3]);
      const selected = new FormData(form).get("answer");
      if (!lesson || selected === null) return;
      const correct = Number(selected) === lesson.answer;
      const result = document.querySelector("#quiz-result");
      result.textContent = correct ? `Correct. ${lesson.choices[lesson.answer]}` : "Try again. Revisit the worked example above.";
      result.dataset.correct = String(correct);
    }
  });

  main.addEventListener("input", event => {
    if (event.target.id === "personal-notes") {
      state.notes[`${route[2]}/${route[3]}`] = event.target.value;
      save();
    }
  });

  main.addEventListener("change", event => {
    const task = state.tasks.find(item => item.id === event.target.dataset.taskToggle);
    if (!task) return;
    task.done = event.target.checked;
    save(task.done ? "Study task completed." : "Study task reopened.");
  });

  const searchIndex = [
    { title: "Fahad Tutorials EBI 4.0", kind: "Collection", url: "#courses/ebi" },
    ...catalog.flatMap(course => [
      { title: `${course.name} ${course.native}`, kind: "Subject", url: subjectPath(course) },
      { title: `${course.name} study notes`, kind: "Book", url: `#books/${course.id}` },
      ...course.lessons.map(lesson => ({ title: lesson.title, kind: `${course.name} lesson`, url: lessonPath(course, lesson) }))
    ])
  ];

  function showResults() {
    const terms = searchInput.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
    const matches = searchIndex.filter(item => terms.every(term => `${item.title} ${item.kind}`.toLocaleLowerCase().includes(term))).slice(0, 9);
    searchResults.innerHTML = matches.length ? matches.map(item => `<a href="${item.url}"><span>${item.title}</span><small>${item.kind}</small></a>`).join("") : '<p class="empty">No matches. Try a subject or topic.</p>';
  }

  function openSearch() {
    if (dialog.open) return;
    searchInput.value = "";
    showResults();
    dialog.showModal();
    searchInput.focus();
  }

  document.querySelector("#open-search").addEventListener("click", openSearch);
  searchInput.addEventListener("input", showResults);
  searchResults.addEventListener("click", event => {
    const link = event.target.closest("a");
    if (!link) return;
    dialog.close();
    if (link.hash === location.hash) main.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });
  window.addEventListener("hashchange", () => render({ focus: true }));
  window.addEventListener("storage", event => {
    if (event.key === storageKey) state = readState();
  });

  function playIntro() {
    const intro = document.querySelector("#intro");
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || (location.hash && location.hash !== "#home")) return;
    try {
      if (sessionStorage.getItem("getplus-intro")) return;
      sessionStorage.setItem("getplus-intro", "1");
    } catch {
      // The intro can still play once for this document.
    }
    intro.hidden = false;
    const finish = () => {
      intro.hidden = true;
      intro.removeEventListener("animationend", onEnd);
    };
    const onEnd = event => {
      if (event.target === intro) finish();
    };
    intro.addEventListener("animationend", onEnd);
    setTimeout(finish, 1800);
  }

  playIntro();
  render();
})();
