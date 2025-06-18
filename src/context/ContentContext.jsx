import React, { createContext, useState, useEffect } from 'react';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const [projects, setProjects] = useState([]);

  const loadMarkdown = async (path) => {
    try {
      const fullPath = import.meta.env.BASE_URL + path;
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
        const res = await fetch(import.meta.env.BASE_URL + 'content/project/index.json');
        if (!res.ok) throw new Error(`Failed to fetch index.json: ${res.status}`);
        const fileList = await res.json();

        const projectData = await Promise.all(
          fileList.map(async (filename) => {
            const { metadata, body } = await loadMarkdown(`content/project/${filename}`);
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
