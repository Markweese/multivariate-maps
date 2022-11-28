/**
 * function to generate title/sub-titles for cart
 * @summary Generates the chart title from the chart title and displayFields object
 * @param {String} text - the title text
 * @param {Object} fields - the displayFields object
 **/
export function generateTitle(text, fields) {
  const accumulator = "";
  const subtitle = Object.keys(fields).reduce(
    (prev, next, index) =>
      (prev += `${index > 0 ? ", " : ""} ${next}: ${fields[next]}`),
    accumulator,
  );
  return { text, subtitle };
}

/**
 * function to get group names for chart data
 * @summary Get group names from data based on pivot field
 * @param {Array<any>} data - the chart data
 * @param {String} pivot - the pivot field
 * @param {Array<string>} excludeGroups - array of group names to ignore
 **/
export function getGroupNames(
  data,
  pivot,
) {
  // This gets the group names used in the tooltip:
  const groupNames = data.map(function (d) { return d[pivot] });

  return [...new Set(groupNames)];
}
