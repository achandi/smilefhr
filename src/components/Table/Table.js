import React, { useState } from "react";

export default (props) => (
  <table className="table">
    <thead>
      <tr>
        <th>
          <abbr title="ID">ID</abbr>
        </th>
        <th>
          <abbr title="given-name">First Name</abbr>
        </th>
        <th>
          <abbr title="family-name">Last Name</abbr>
        </th>
        <th>
          <abbr title="birth-date">Birth Date</abbr>
        </th>
        <th>
          <abbr title="gender">Gender</abbr>
        </th>
      </tr>
    </thead>
    <tbody>
      {props.data &&
        props.data.map(({ resource }, ind) => (
          <tr key={ind}>
            <td>{resource.id}</td>
            <td>
              {resource.name && resource.name[0].given
                ? resource.name[0].given.join(" ")
                : "N/A"}
            </td>
            <td>{(resource.name && resource.name[0].family) || "N/A"}</td>
            <td>{resource.birthDate || "N/A"}</td>
            <td>{resource.gender || "N/A"}</td>
          </tr>
        ))}
    </tbody>
  </table>
);
