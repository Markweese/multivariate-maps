import vegaEmbed from "vega-embed";
import { generateTitle, getGroupNames } from "./charts";

export function multiLineChart(
  el,
  data,
  title = "",
  yAxisTitle = "",
  chartColors = ["#7fc97f","#beaed4","#fdc086","#ffff99","#386cb0","#f0027f","#bf5b17","#666666"],
  gridLines = false,
  interpolation = "linear",
  displayFields = {},
  field = "val",
  pivot = "projectName",
  dateFormat = "%b %Y",
  numberFormat = ".2f",
) {
  const chartPOC = {
    data: {
      values: [...data],
    },
    width: "container",
    height: 200,
    title: title,
    encoding: {
      x: {
        field: "datemonth",
        type: "temporal",
        axis: {
          grid: gridLines,
          format: dateFormat,
          titleFontSize: 12,
          labelFontSize: 12,
        },
      },
    },
    layer: [
      {
        mark: {
          type: "line",
          interpolate: interpolation,
        },
        selection: {
          region: {
            type: "interval",
            bind: "scales",
            encodings: ["y"],
            zoom: "wheel!",
            clear: "dblclick",
          },
        },
        encoding: {
          y: {
            field,
            type: "quantitative",
            axis: {
              grid: gridLines,
              title: yAxisTitle,
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
          color: {
            field: pivot,
            type: "nominal",
            scale: { range: chartColors },
            legend: {
              orient: "right",
              title: null,
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
        },
      },
      {
        transform: [{ pivot, value: field, groupby: ["datemonth"] }],
        mark: {
          type: "rule",
          color: "grey",
        },
        encoding: {
          opacity: {
            condition: { value: 1, selection: "hover" },
            value: 0,
          },
          tooltip: [
            {
              field: "datemonth",
              type: "temporal",
              title: "Date",
              format: dateFormat,
            },
            ...getGroupNames(data, pivot).map((name) => ({
              field: name,
              title: name,
              type: "quantitative",
              format: numberFormat,
            })),
          ],
        },
        selection: {
          hover: {
            type: "single",
            fields: ["datemonth"],
            nearest: true,
            on: "mouseover",
            empty: "none",
            clear: "mouseout",
          },
        },
      },
    ],
  };
  return vegaEmbed(el, chartPOC, {
    defaultStyle: false,
    logLevel: 1, // Disables some unnecessary logs https://vegawidget.github.io/vegawidget/reference/vega_embed.html
    actions: {
      export: false,
      source: false,
      compiled: false,
      editor: false,
    },
  });
}
