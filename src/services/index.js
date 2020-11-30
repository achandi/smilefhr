import _axios from "axios";
import _ from "lodash";
const axios = _axios.create({
  baseURL: "http://hapi.fhir.org/baseR4",
});

export const getPatients = async (name, birthdate) => {
  try {
    if (birthdate) {
      birthdate = new Date(birthdate).toISOString().slice(0, 10);
    }
    const res = await axios.get("/Patient", { params: { name, birthdate } });
    return _.orderBy(res.data.entry, (item) => {
      return item.resource.birthDate;
    });
  } catch (err) {
    return err;
  }
};

export const getPractitioners = () => {
  return axios.get("/Practitioner");
};
