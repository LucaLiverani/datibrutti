import { select, descending } from 'd3';
import { viz } from './viz';
import { data } from '@curran/un-population-estimates-2024';
import { observeResize } from '@curran/responsive-axes';

const populationColumn =
  'Total Population, as of 1 January (thousands)';
const nameColumn = 'Region, subregion, country or area *';
// Take the top n countries by population
const n = 10;
const countriesData = data.filter(
  (d) => d['Type'] === 'Country/Area',
);
const sortedData = countriesData.sort((a, b) =>
  descending(a[populationColumn], b[populationColumn]),
);
const topNData = sortedData.slice(0, n);

export const main = (container, { state, setState }) => {
  const dimensions = observeResize({
    state,
    setState,
    container,
  });

  if (dimensions === null) return;

  const { width, height } = dimensions;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  viz(svg, {
    data: topNData,
    xValue: (d) => d[nameColumn],
    xAxisLabelText: 'Country',
    xAxisLabelOffset: 38,
    yValue: (d) => d[populationColumn],
    yAxisLabelText: 'Population (thousands)',
    yAxisLabelOffset: 17,
    innerRectFill: '#E8E8E8',
    padding: 12 / 100,
    marginTop: 43,
    marginBottom: 50,
    marginLeft: 74,
    marginRight: 20,
    width,
    height,
  });

  // Sample row (d):
  // {
  //   "species": "Adelie",
  //   "island": "Torgersen",
  //   "bill_length_mm": 39.1,
  //   "bill_depth_mm": 18.7,
  //   "flipper_length_mm": 181,
  //   "body_mass_g": 3750,
  //   "sex": "male",
  //   "year": "2007"
  // }
};
