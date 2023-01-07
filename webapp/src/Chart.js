import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Chart = ({ data }) => {
  const values = Object.values(data);
  const mean = (1 / values.length) * values.reduce((a, b) => a + b);

  const margin = { top: 50, bottom: 50, right: 50, left: 50 };

  const width = 800;
  const height = 1000;

  const plotWidth = width - margin.right - margin.left;
  const plotHeight = height - margin.top - margin.bottom;

  const svgElementRef = useRef();

  const renderer = (svg) => {
    let rows = Object.keys(data).map((tag) => {
      return {
        tag: tag,
        value: data[tag] - mean,
      };
    });
    rows.sort((a, b) => b["value"] - a["value"]);

    const maxValue = 0.4;

    rows = rows.map((x) => {
      x["value"] = Math.max(-maxValue, x["value"]);
      x["value"] = Math.min(maxValue, x["value"]);
      return x;
    });

    const tags = rows.map((x) => x["tag"]);

    console.log(rows);

    const x = d3.scaleLinear([-maxValue, maxValue], [0, plotWidth]);
    const y = d3.scaleBand(tags, [0, plotHeight]).padding(0.1);

    const xAxis = d3.axisTop(x);
    const colorScheme = d3.scaleOrdinal(d3.schemePastel1);

    const plotArea = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    plotArea
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", plotWidth)
      .attr("height", plotHeight)
      .attr("fill", "white")
      .attr("stroke", "black");

    plotArea
      .append("g")
      .selectAll("rect")
      .data(rows)
      .join("rect")
      .attr("x", (entry) => (x(entry.value) > x(0) ? x(0) : x(entry.value)))
      .attr("y", (entry) => y(entry.tag))
      .attr("width", (entry) =>
        x(entry.value) > x(0) ? x(entry.value) - x(0) : x(0) - x(entry.value)
      )
      .attr("height", y.bandwidth())
      .attr("stroke", "black")
      .attr("fill", (entry) => "red");

    plotArea
      .append("g")
      .selectAll("text")
      .data(rows)
      .join("text")
      .attr("x", (entry) => (x(entry.value) > x(0) ? x(0) - 10 : x(0) + 10))
      .attr("y", (entry) => y(entry.tag) + y.bandwidth() / 2 + 3)
      .attr("font-size", 12)
      .attr("text-anchor", (entry) => (x(entry.value) > x(0) ? "end" : "start"))
      .attr("stroke", "black")
      .text((entry) => `#${entry.tag}  `);
  };

  useEffect(() => {
    if (svgElementRef.current) {
      const svg = d3.select(svgElementRef.current);
      renderer(svg);
    }
  }, [data, renderer, svgElementRef]);

  return (
    <svg
      width={width}
      height={height}
      ref={svgElementRef}
      style={{ backgroundColor: "lightgray" }}
    />
  );
};

export default Chart;
