import { FC, KeyboardEvent, useState } from "react";

import "./App.css";

const App: FC = () => {
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter") {
      const newTags = e.currentTarget.value
        .split(",")
        .filter((tag: string) => tag.trim() !== "")
        .map((tag: string) => tag.trim());
      setTags(newTags);
      e.currentTarget.value = "";
    }
  };

  const pickRandomTag = (): void => {
    const randomIndex = Math.floor(Math.random() * tags.length);
    const randomTag = tags[randomIndex];
    highlightTag(randomTag);
    setTimeout(() => unHighlightTag(randomTag), 100);
  };

  const highlightTag = (tag: string): void => {
    const tagEl = document.getElementById(tag);
    if (tagEl !== null) tagEl.classList.add("highlight");
  };

  const unHighlightTag = (tag: string): void => {
    const tagEl = document.getElementById(tag);
    if (tagEl !== null) tagEl.classList.remove("highlight");
  };

  return (
    <div className="container">
      <h3>
        Enter all of the choices divided by a comma (','). <br /> Press enter
        when you're done
      </h3>
      <textarea
        placeholder="Enter choices here..."
        onKeyDown={handleKeyDown}
      ></textarea>

      <div id="tags">
        {tags.map((tag: string) => (
          <span key={tag} id={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>

      <button className="btn-pick" onClick={pickRandomTag}>
        Pick a Random Tag
      </button>
    </div>
  );
};

export default App;
