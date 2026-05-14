import React, { createContext, useState, useEffect } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

if (typeof window !== "undefined" && !window.Buffer) {
  window.Buffer = Buffer;
}

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [projects, setProjects] = useState([]);

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const joinPath = (base, path) => {
    const normalizedBase = base.replace(/\/+$/, "");
    const normalizedPath = path.replace(/^\/+/, "");
    return `${normalizedBase}/${normalizedPath}`.replace(/^\/{2,}/, "/");
  };

  const loadMarkdown = async (relativePath) => {
    try {
      const fullPath = joinPath(base, relativePath);
      const res = await fetch(fullPath);
      if (!res.ok) throw new Error(`Failed to load ${fullPath}: ${res.status}`);
      const text = await res.text();
      const { data, content } = matter(text);
      return { metadata: data, body: content };
    } catch (err) {
      console.error(err);
      return { metadata: {}, body: '' };
    }
  };

  useEffect(() => {
    const loadPages = async () => {
      try {
        const [home, about, contact] = await Promise.all([
          loadMarkdown('content/home.md'),
          loadMarkdown('content/about.md'),
          loadMarkdown('content/contact.md'),
        ]);
        setContent({ home, about, contact });
      } catch (err) {
        console.error("Failed to load pages:", err);
      }
    };

    const loadProjects = async () => {
      try {
        const indexUrl = joinPath(base, 'content/project/index.json');
        const res = await fetch(indexUrl);
        if (!res.ok) throw new Error(`Failed to fetch index.json: ${res.status}`);
        const fileList = await res.json();

        const projectData = await Promise.all(
          fileList.map(async (filename) => {
            const filePath = `content/project/${filename}`;
            const { metadata, body } = await loadMarkdown(filePath);
            return { ...metadata, body };
          })
        );

        setProjects(projectData);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };

    loadPages();
    loadProjects();
  }, []);

  return (
    <ContentContext.Provider value={{ ...content, projects }}>
      {children}
    </ContentContext.Provider>
  );
};
