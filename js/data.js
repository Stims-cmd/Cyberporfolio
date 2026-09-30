/**
 * data.js
 * Charge toutes les données JSON du portfolio et construit les index
 * de relation (skill -> projets, technologie -> projets, etc.)
 */
const PortfolioData = (() => {
  const store = {
    projects: [],
    skills: [],
    journey: [],
    lab: [],
    motorsport: null,
  };

  // index technologie/skill id -> liste de projets qui l'utilisent
  const skillToProjects = {};

  async function loadJSON(path) {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[PortfolioData] Impossible de charger ${path} :`, err);
      return null;
    }
  }

  function buildSkillIndex() {
    store.projects.forEach((project) => {
      const refs = [...(project.technologies || []), ...(project.skills || [])];
      refs.forEach((id) => {
        if (!skillToProjects[id]) skillToProjects[id] = [];
        skillToProjects[id].push(project.id);
      });
    });
  }

  async function init() {
    const [projects, skills, journey, lab, motorsport] = await Promise.all([
      loadJSON("./data/projects.json"),
      loadJSON("./data/skills.json"),
      loadJSON("./data/journey.json"),
      loadJSON("./data/lab.json"),
      loadJSON("./data/motorsport.json"),
    ]);
    store.projects = projects || [];
    store.skills = skills || [];
    store.journey = journey || [];
    store.lab = lab || [];
    store.motorsport = motorsport || { roles: [], events: [], skillsCatalog: [] };
    buildSkillIndex();
    return store;
  }

  function getProjectById(id) {
    return store.projects.find((p) => p.id === id);
  }

  function getProjectsForSkill(id) {
    const ids = skillToProjects[id] || [];
    return ids.map(getProjectById).filter(Boolean);
  }

  function findSkillMeta(id) {
    for (const domain of store.skills) {
      const found = domain.skills.find((s) => s.id === id);
      if (found) return { ...found, domain: domain.domain };
    }
    return null;
  }

  return { init, store, getProjectById, getProjectsForSkill, findSkillMeta };
})();
