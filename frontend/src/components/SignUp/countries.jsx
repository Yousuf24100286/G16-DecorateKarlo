import sc from "states-cities-db";
const COUNTRIES = sc.getCountries();

const getCountryTelCode = country =>
  country && COUNTRIES.find(({ iso }) => iso === country).prefix;

const countryOptions = COUNTRIES.map(({ name, iso }) => ({
  label: name,
  value: iso
}));

export { COUNTRIES, getCountryTelCode, countryOptions };
