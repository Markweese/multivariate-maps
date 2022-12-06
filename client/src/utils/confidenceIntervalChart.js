import vegaEmbed from "vega-embed";
import { generateTitle, getGroupNames } from "./charts";

function bandColors(colors) {
  return colors.map((c) => {
    c.replace("rgb(", "rgba(");
    c.replace(")", ", .5)");

    return c;
  });
}

/**
 * Here is the stacked bar chart
 * @function
 */
export function confidenceIntervalChart(
  el,
  data,
  themeSet,
  title = "",
  yAxisTitle,
  chartColors,
  gridLines,
  interpolation,
  compressTooltip = false,
  showErrorBand = true,
  displayFields,
  pivot,
  dateFormat,
  excludeGroups,
  customSort,
  numberFormat = ".2f",
  upperField = "zhvi_max",
  lowerField = "zhvi_min",
  highlightedField = "zhvi_mean"
) {
  // ticks must be caluclated by the number of months, to prevent wonky ticks appearing
  let ticks = 5;

  const chartPOC = {
    data: {
      values: [...data],
    },
    title: title,
    width: "container",
    height: 450,
    encoding: {
      x: {
        field: "datemonth",
        timeUnit: "yearmonth",
        type: "temporal",
      },
    },
    layer: [
      {
        mark: {
          type: "errorband",
          interpolate: interpolation,
        },
        encoding: {
          y: {
            field: upperField,
            type: "quantitative",
            axis: {
              grid: gridLines,
              title: yAxisTitle,
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
          y2: { field: lowerField },
          x: {
            field: "datemonth",
            timeUnit: "yearmonth",
            type: "temporal",
            axis: {
              tickCount: ticks,
              format: dateFormat,
              grid: gridLines,
              title: "",
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
          color: {
            sort: customSort,
            field: pivot,
            type: "nominal",
            scale: { range: bandColors(chartColors) },
            legend: null,
          },
        },
      },
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
            field: highlightedField,
            type: "quantitative",
            axis: {
              grid: gridLines,
              title: yAxisTitle,
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
          x: {
            field: "datemonth",
            timeUnit: "yearmonth",
            type: "temporal",
            axis: {
              tickCount: ticks,
              format: dateFormat,
              grid: gridLines,
              title: "",
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
          color: {
            sort: customSort,
            field: pivot,
            type: "nominal",
            scale: { range: chartColors },
            legend: {
              orient: "top",
              direction: "vertical",
              columns: 2,
              title: null,
              titleFontSize: 12,
              labelFontSize: 12,
            },
          },
        },
      },
      {
        mark: { type: "rule", color: "grey" },
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
          ]
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
    config: {
      background: "rgba(1,1,1,0)",
    },
  };

  return vegaEmbed(el, chartPOC, {
    theme: themeSet,
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
