import mermaid from "mermaid";
import { useEffect } from "react";

type MermaidProps = {
  chart: string;
};

mermaid.initialize({
  themeVariables: {
    fontSize: "18px",
    padding: "15px",
  },
});

const MermaidRenderer: React.FC<MermaidProps> = ({ chart }) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, [chart]);

  return (
    <div className="mermaid" style={{ width: "100%" }}>
      {chart}
    </div>
  );
};

export { MermaidRenderer };
